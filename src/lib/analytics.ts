import { SignJWT, importPKCS8 } from 'jose';

/**
 * Dados do /painel: tráfego vem do Umami (self-hosted, já coleta o site e o
 * evento lead-orcamento) e a busca vem do Search Console via conta de serviço.
 * Env: UMAMI_URL, UMAMI_USERNAME, UMAMI_PASSWORD, UMAMI_WEBSITE_ID,
 * GOOGLE_SA_JSON (conteúdo do JSON da chave), SC_SITE.
 * Cache em memória de algumas horas — os números mudam ao longo do dia.
 */

const CACHE_MS = 3 * 60 * 60 * 1000;
const TZ = 'America/Sao_Paulo';
const DAY = 86400000;
const LEAD_EVENT = 'lead-orcamento';

export type Dashboard = {
  updatedAt: string;
  range: { label: string };
  kpis: { key: string; label: string; hint: string; value: number; previous: number }[];
  daily: { date: string; visitors: number }[];
  sources: { label: string; visitors: number }[];
  pages: { path: string; visitors: number }[];
  events: { name: string; count: number }[];
  devices: { label: string; share: number }[];
  search:
    | {
        range: string;
        clicks: number;
        impressions: number;
        position: number | null;
        queries: { query: string; clicks: number; impressions: number; position: number }[];
        pages: { path: string; clicks: number; impressions: number }[];
      }
    | null;
};

let cache: { at: number; data: Dashboard } | null = null;

function env(name: string): string {
  const v = process.env[name] ?? (import.meta.env as Record<string, string | undefined>)[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

function isoDaysAgo(days: number): string {
  return new Date(Date.now() - days * DAY).toLocaleDateString('en-CA', { timeZone: TZ });
}

// ---------- Umami ----------

type Metric = { x: string; y: number };

async function umamiToken(): Promise<string> {
  const res = await fetch(`${env('UMAMI_URL')}/api/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username: env('UMAMI_USERNAME'), password: env('UMAMI_PASSWORD') }),
  });
  const json = await res.json();
  if (!json.token) throw new Error(`Umami auth failed: ${res.status}`);
  return json.token;
}

async function umami<T>(token: string, path: string, params: Record<string, string | number>): Promise<T> {
  const qs = new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)]));
  const res = await fetch(`${env('UMAMI_URL')}/api/websites/${env('UMAMI_WEBSITE_ID')}/${path}?${qs}`, {
    headers: { authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Umami ${path}: ${res.status} ${await res.text()}`);
  return res.json();
}

const DEVICES: Record<string, string> = {
  mobile: 'Celular',
  desktop: 'Computador',
  laptop: 'Computador',
  tablet: 'Tablet',
};

// Domínio do referrer → nome legível. O resto aparece como o próprio domínio
function sourceLabel(domain: string): string {
  if (!domain) return 'Direto (link salvo ou digitado)';
  const d = domain.replace(/^(www|m|l|lm)\./, '');
  if (/instagram\.com$/.test(d)) return 'Instagram';
  if (/linkedin\.com$|lnkd\.in$/.test(d)) return 'LinkedIn';
  if (/google\./.test(d)) return 'Google';
  if (/facebook\.com$/.test(d)) return 'Facebook';
  if (/t\.co$|twitter\.com$|x\.com$/.test(d)) return 'X';
  if (/tiktok\.com$/.test(d)) return 'TikTok';
  if (/youtube\.com$|youtu\.be$/.test(d)) return 'YouTube';
  if (/pinterest\./.test(d)) return 'Pinterest';
  if (/bing\.com$/.test(d)) return 'Bing';
  if (/chatgpt\.com$|openai\.com$/.test(d)) return 'ChatGPT';
  return d;
}

// ---------- Search Console ----------

async function googleToken(): Promise<string> {
  const sa = JSON.parse(env('GOOGLE_SA_JSON')) as { client_email: string; private_key: string };
  const key = await importPKCS8(sa.private_key, 'RS256');
  const now = Math.floor(Date.now() / 1000);
  const assertion = await new SignJWT({ scope: 'https://www.googleapis.com/auth/webmasters.readonly' })
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuer(sa.client_email)
    .setAudience('https://oauth2.googleapis.com/token')
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key);

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`Google auth failed: ${JSON.stringify(json)}`);
  return json.access_token;
}

type ScRow = { keys?: string[]; clicks: number; impressions: number; position: number };

async function scQuery(token: string, body: object): Promise<ScRow[]> {
  const site = encodeURIComponent(env('SC_SITE'));
  const res = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${site}/searchAnalytics/query`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (json.error) throw new Error(`Search Console: ${json.error.message}`);
  return json.rows ?? [];
}

const fmtDay = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });

async function buildSearch(): Promise<Dashboard['search']> {
  const token = await googleToken();
  // Search Console libera os dados com uns 2–3 dias de atraso
  const startDate = isoDaysAgo(30);
  const endDate = isoDaysAgo(3);
  const [total, queries, pages] = await Promise.all([
    scQuery(token, { startDate, endDate }),
    scQuery(token, { startDate, endDate, dimensions: ['query'], rowLimit: 10 }),
    scQuery(token, { startDate, endDate, dimensions: ['page'], rowLimit: 8 }),
  ]);
  const t = total[0];
  return {
    range: `${fmtDay(startDate)} a ${fmtDay(endDate)}`,
    clicks: t?.clicks ?? 0,
    impressions: t?.impressions ?? 0,
    position: t ? t.position : null,
    queries: queries.map((r) => ({
      query: r.keys?.[0] ?? '',
      clicks: r.clicks,
      impressions: r.impressions,
      position: r.position,
    })),
    pages: pages.map((r) => ({
      path: new URL(r.keys?.[0] ?? '/', 'https://miguelmoraes.pro').pathname,
      clicks: r.clicks,
      impressions: r.impressions,
    })),
  };
}

// ---------- Painel ----------

async function build(): Promise<Dashboard> {
  // Janela de 28 dias fechando agora, comparada com os 28 anteriores
  const endAt = Date.now();
  const startAt = new Date(`${isoDaysAgo(27)}T00:00:00-03:00`).getTime();
  const prevStartAt = startAt - 28 * DAY;
  const cur = { startAt, endAt };
  const prev = { startAt: prevStartAt, endAt: startAt - 1 };

  const token = await umamiToken();
  type Stats = { pageviews: number; visitors: number; visits: number };

  const [stats, series, referrers, channels, paths, events, prevEvents, devices, search] = await Promise.all([
    umami<Stats & { comparison: Stats }>(token, 'stats', cur),
    umami<{ sessions: Metric[] }>(token, 'pageviews', { ...cur, unit: 'day', timezone: TZ }),
    umami<Metric[]>(token, 'metrics', { ...cur, type: 'referrer', limit: 50 }),
    // A lista de referrers não traz o acesso direto; sai do total menos os canais
    umami<Metric[]>(token, 'metrics', { ...cur, type: 'channel' }),
    umami<Metric[]>(token, 'metrics', { ...cur, type: 'path', limit: 40 }),
    umami<Metric[]>(token, 'metrics', { ...cur, type: 'event', limit: 20 }),
    umami<Metric[]>(token, 'metrics', { ...prev, type: 'event', limit: 20 }),
    umami<Metric[]>(token, 'metrics', { ...cur, type: 'device' }),
    // Busca é extra: se o Search Console falhar, o resto do painel continua
    buildSearch().catch((err) => {
      console.error('[painel] search', err);
      return null;
    }),
  ]);

  const leads = (rows: Metric[]) => rows.find((r) => r.x === LEAD_EVENT)?.y ?? 0;

  // Agrupa referrers pelo nome legível (l.instagram.com + instagram.com = Instagram)
  const sourceMap = new Map<string, number>();
  for (const r of referrers) {
    const label = sourceLabel(r.x ?? '');
    sourceMap.set(label, (sourceMap.get(label) ?? 0) + Number(r.y));
  }
  // O canal "direct" do Umami só conta visita sem query string, então o direto
  // é aproximado: pessoas menos as que vieram de algum canal com origem
  const fromChannels = channels.filter((c) => c.x !== 'direct').reduce((a, c) => a + Number(c.y), 0);
  const direct = Math.max(0, Number(stats.visitors) - fromChannels);
  if (direct) sourceMap.set(sourceLabel(''), (sourceMap.get(sourceLabel('')) ?? 0) + direct);

  // Umami pula dias sem visita; preenche os 28 pra manter a escala do gráfico
  const byDay = new Map(series.sessions.map((s) => [String(s.x).slice(0, 10), Number(s.y)]));

  const deviceMap = new Map<string, number>();
  for (const d of devices) {
    const label = DEVICES[d.x] ?? d.x;
    deviceMap.set(label, (deviceMap.get(label) ?? 0) + Number(d.y));
  }
  const deviceTotal = [...deviceMap.values()].reduce((a, b) => a + b, 0) || 1;

  return {
    updatedAt: new Date().toLocaleString('pt-BR', {
      timeZone: TZ,
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }),
    range: { label: 'Últimos 28 dias, comparados com os 28 anteriores' },
    kpis: [
      {
        key: 'visitors',
        label: 'Pessoas',
        hint: 'Visitantes únicos no período',
        value: Number(stats.visitors),
        previous: Number(stats.comparison.visitors),
      },
      {
        key: 'visits',
        label: 'Visitas',
        hint: 'Cada vez que alguém entrou no site',
        value: Number(stats.visits),
        previous: Number(stats.comparison.visits),
      },
      {
        key: 'pageviews',
        label: 'Páginas vistas',
        hint: 'Total de páginas abertas',
        value: Number(stats.pageviews),
        previous: Number(stats.comparison.pageviews),
      },
      {
        key: 'leads',
        label: 'Pedidos de orçamento',
        hint: 'Formulário do /trabalhe-comigo enviado',
        value: leads(events),
        previous: leads(prevEvents),
      },
    ],
    daily: Array.from({ length: 28 }, (_, i) => {
      const date = isoDaysAgo(27 - i);
      return { date, visitors: byDay.get(date) ?? 0 };
    }),
    sources: [...sourceMap.entries()]
      .map(([label, visitors]) => ({ label, visitors }))
      .sort((a, b) => b.visitors - a.visitors)
      .slice(0, 8),
    pages: paths
      .filter((p) => !p.x.startsWith('/painel'))
      .slice(0, 10)
      .map((p) => ({ path: p.x, visitors: Number(p.y) })),
    events: events.map((e) => ({ name: e.x, count: Number(e.y) })),
    devices: [...deviceMap.entries()].map(([label, v]) => ({ label, share: v / deviceTotal })),
    search,
  };
}

export async function getDashboard(): Promise<Dashboard> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.data;
  const data = await build();
  cache = { at: Date.now(), data };
  return data;
}
