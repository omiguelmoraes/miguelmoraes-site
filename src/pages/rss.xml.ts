import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: 'Miguel Moraes — Blog',
    description: 'Notas e reflexões sobre design, código e o dia a dia de quem constrói.',
    site: context.site!,
    items: posts.map(post => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      categories: [post.data.category],
    })),
    // O site é trailingSlash: 'never'; sem isso o feed apontaria pra /blog/foo/
    // e discordaria do canonical de cada post
    trailingSlash: false,
    customData: '<language>pt-br</language>',
  });
}
