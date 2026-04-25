export const allProjects = {
  'flouds': {
    title: 'Flouds Performance Digital',
    year: '2025',
    category: 'Web Design',
    location: 'Porto Alegre, Brazil',
    cover: '/projects/flouds/01.webp',
    thumbnail: '/projects/flouds/01.webp',
    url: 'https://flouds.com.br',
    tags: ['Web Design', 'UI', 'Front-end'],
    challenge: {
      heading: 'Turning a data-driven brand into a high-performance digital presence',
      body: "After building Flouds' visual identity, the next step was to transform their positioning into a digital presence that went beyond a simple showcase. The site needed to communicate authority, explain the value proposition clearly, and work as a strategic acquisition channel — converting visitors into qualified leads directly and effectively.",
      images: ['/projects/flouds/02.webp', '/projects/flouds/03.webp'],
    },
    result: {
      heading: 'A modern, strategic, conversion-focused website',
      body: "The result was a solid and impactful site, with well-structured architecture, fluid navigation, and persuasive copy. The modern, objective design reflects the brand's technological DNA and guides users through a clear journey to conversion — making the site one of Flouds' main growth drivers.",
      images: ['/projects/flouds/04.webp', '/projects/flouds/05.webp'],
    },
  },
  'yoursbank': {
    title: 'Yours Bank',
    year: '2025',
    category: 'Web Design',
    location: 'Porto Alegre, Brazil',
    cover: '/projects/yoursbank/cover.png',
    thumbnail: '/projects/yoursbank/01.webp',
    figmaUrl: 'https://figma.com',
    tags: ['Web Design', 'UI/UX'],
    challenge: {
      heading: "Translating Yours Bank's innovative proposition into a platform that builds trust and drives action",
      body: "The previous site didn't reflect the fintech's value proposition or meet the expectations of users who needed to understand and trust the product. More than a visual redesign, the goal was to communicate security in a sector full of distrust — with a lightweight, conversion-focused structure.",
      images: ['/projects/yoursbank/02.webp', '/projects/yoursbank/03.webp'],
    },
    result: {
      heading: 'A more human, intuitive platform that simplifies communication and accelerates conversion',
      body: "The result was a site that highlights Yours Bank's differentiators without noise. Content was simplified and the tone of voice reinforced approachability. The solution brought a reusable, scalable structure — making the experience more intuitive, building greater trust and increasing engagement at every conversion point.",
      images: ['/projects/yoursbank/04.webp', '/projects/yoursbank/05.webp'],
    },
  },
  'msk': {
    title: 'MSK Perfuradora de Metais',
    year: '2025',
    category: 'Web Design',
    location: 'São Leopoldo, Brazil',
    cover: '/projects/msk/01.webp',
    thumbnail: '/projects/msk/01.webp',
    tags: ['Web Design', 'UI/UX'],
    challenge: {
      heading: "Converting 26 years of expertise into a modern digital presence built to generate business",
      body: "MSK is a reference in its sector, but their digital positioning didn't match that strength. The goal was to create a site that not only modernized their image, but functioned as a sales tool — making their vast product catalog easy to navigate and optimizing qualified lead capture.",
      images: ['/projects/msk/02.webp', '/projects/msk/03.webp'],
    },
    result: {
      heading: 'A UX-focused platform with a bold identity — built to turn visitors into clients',
      body: "The result is a robust, intuitive platform that positions MSK as a market leader both online and offline. With a clear product catalog and multiple lead generation touchpoints, the new site became a central asset in the company's growth strategy — attracting new clients and reinforcing their authority.",
      images: ['/projects/msk/04.webp', '/projects/msk/05.webp'],
    },
  },
  'sant': {
    title: 'Sant Saúde',
    year: '2025',
    category: 'Web Design',
    location: 'Brazil',
    cover: '/projects/sant/01.webp',
    thumbnail: '/projects/sant/01.webp',
    tags: ['Web Design', 'UI/UX', 'Health'],
    challenge: {
      heading: 'Aligning a healthcare platform with its mission through usability and scalability',
      body: "The previous site was overloaded. Excessive animations and a dense information architecture created a confusing and frustrating user experience. Slow loading times were a direct barrier for users seeking essential health information — compromising both performance and the effectiveness of the channel.",
      images: ['/projects/sant/02.webp', '/projects/sant/03.webp'],
    },
    result: {
      heading: 'A performance-focused design system that simplified content and navigation',
      body: "By optimizing animations and organizing information logically, we delivered a visibly faster, scalable site that improves user engagement. The result is a platform that not only looks clean, but actually works — allowing users to find what they need quickly and effortlessly.",
      images: ['/projects/sant/04.webp', '/projects/sant/05.webp'],
    },
  },
};

export type ProjectSlug = keyof typeof allProjects;
export type Project = typeof allProjects[ProjectSlug];
