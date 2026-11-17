// Featured roles. Bullets are [bold lead, rest of sentence].
export const FEATURED = [
  {
    id: 'kollegio',
    tags: [{ tone: 'lilac', label: 'Current role' }, { label: 'Remote, US' }, { label: 'Jan 2026 – now' }],
    brand: { name: 'Kollegio', href: 'https://www.kollegio.ai/', logo: 'assets/kollegio/symbol.png', logoAlt: 'Kollegio logo' },
    summary: 'An AI-powered EdTech startup making college discovery, admissions and scholarships more accessible to students across the US.',
    facts: [['Role', 'Software Engineer'], ['Worked across', 'Frontend, GraphQL, Mixpanel'], ['Led', 'Features, POC → production']],
    proof: [
      ['4', 'product areas I shipped features in: recommender, Hero Journey, Discover, Scholarship Essays'],
      ['6', 'product surfaces instrumented in Mixpanel, with funnels and dashboards'],
      ['REST → GQL', 'shared entities migrated across client and backend, keeping existing features working'],
    ],
    columns: [
      {
        title: 'Backend & data',
        items: [
          ['Led the REST to GraphQL migration', ' for shared entities, client and backend, without breaking existing features.'],
          ['Moved data fetching to React Query', ' for consistent, maintainable caching.'],
          ['Wired swipe decisions and AI chat', ' through to the backend.'],
          ['Added Mixpanel analytics', ' across onboarding, chat, college matching, decks, redirects and CTAs, then built the dashboards and funnels the team uses to read engagement.'],
        ],
      },
      {
        title: 'Product & frontend',
        items: [
          ['Rebuilt the college recommender', ' as a swipe experience with real-time AI chat.'],
          ['Led the Hero Journey redesign', ' from proof of concept to production.'],
          ['Built Discover and Scholarship Essays', ' through UI, API, QA and iteration.'],
          ['Faster loads', ' with lazy loading and CDN asset delivery.'],
        ],
      },
    ],
    stack: ['React', 'Remix', 'TypeScript', 'GraphQL', 'NestJS', 'Prisma', 'PostgreSQL', 'React Query', 'Chakra UI', 'Mixpanel', 'Cloudflare', 'Docker'],
    visual: { tone: 'lilac', caption: 'AI chat and swipe recommender', badge: 'Prototype', kind: 'kollegio' },
  },
  {
    id: 'pattern',
    flip: true,
    accent: 'var(--mint)',
    tags: [{ tone: 'mint', label: 'Full-stack' }, { label: 'Remote' }, { label: 'Jun 2025 – Dec 2025' }],
    title: 'Pattern Technologies',
    summary: 'I owned the full lifecycle of SaaS products on my own, from backend architecture and partner integrations to cloud deployment and app store launches.',
    facts: [['Role', 'Software Engineer, after an internship'], ['Cloud', 'AWS EC2, S3, RDS'], ['Shipped', '2 mobile apps and a web app']],
    proof: [
      ['2', 'React Native apps launched on the App Store: Calify and Prep&Co'],
      ['1', 'white-label codebase serving multiple brands on web and mobile'],
      ['3', 'AWS services I ran in production: EC2, S3 and RDS'],
    ],
    live: [
      { href: 'https://apps.apple.com/qa/app/calify-healthy-meal-plans/id6749509997', label: 'Calify', icon: 'apple' },
      { href: 'https://apps.apple.com/qa/app/prep-co/id6677024904', label: 'Prep&Co app', icon: 'apple' },
      { href: 'https://meals.prepandco.com/', label: 'meals.prepandco.com ↗' },
    ],
    columns: [
      {
        title: 'Integrations & APIs',
        items: [
          ['Built webhook integrations with partner platforms', ' so orders flow into one backend in real time.'],
          ['Helped brands with multiple kitchens', ' centralise reporting and track performance.'],
          ['Designed RESTful APIs', ' and tuned queries and database performance.'],
          ['White-label architecture', ' for web and mobile, with theming and tenants controlled from the backend.'],
          ['Built Metabase reporting', ' in a separate project, writing the SQL behind the dashboards.'],
        ],
      },
      {
        title: 'Cloud & delivery',
        items: [
          ['Ran Django SaaS backends on AWS', ' (EC2, S3, RDS) with a focus on reliability and security.'],
          ['Migrated EC2 and RDS to a different AWS region', ' during a regional outage, keeping downtime to a minimum.'],
          ['Set up CI/CD with GitHub Actions', ' for automated deployments.'],
          ['Launched Calify and Prep&Co', ' on iOS and Android with React Native.'],
          ['Built the Prep&Co meal subscription site', ' in Next.js as an intern.'],
        ],
      },
    ],
    stack: ['Django', 'Python', 'AWS', 'PostgreSQL', 'REST', 'Webhooks', 'GitHub Actions', 'React Native', 'Next.js', 'Metabase'],
    visual: { tone: 'mint', caption: 'How partner orders reached the dashboard', badge: 'Live data flow', kind: 'flow', note: 'Partner names left out on purpose.' },
  },
];
