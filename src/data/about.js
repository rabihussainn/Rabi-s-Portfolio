export const QUICK_FACTS = [
  ['Now', 'Software Engineer at Kollegio'],
  ['Work style', 'Fully remote since day one'],
  ['Time zone', 'PKT (UTC+5)'],
  ['Strongest at', 'Full-stack, backend, APIs, integrations'],
  ['Cloud', 'AWS, Cloudflare, Terraform'],
  ['Education', 'BS Computer Science, LUMS ’25'],
];

export const ABOUT_PARAGRAPHS = [
  'I’m a computer science graduate from LUMS. I’ve shipped product features people tap every day, but the part I enjoy most is what sits behind them: the API that ties partners together, the database query that suddenly runs ten times faster, the deploy that just works.',
  'I also enjoy the cloud side: designing systems that stay reliable and affordable as they grow, from the first diagram to multi-AZ deploys.',
  'I’ve worked fully remote for my whole career so far, so clear async writing, good PR descriptions and showing up reliably across time zones come naturally.',
  'Before engineering took over, I spent a lot of time on research and teaching, which is why I still like talking to users and explaining things clearly.',
];

export const ABOUT_CHIPS = [
  { label: 'Backend', tone: 'plain' }, { label: 'Cloud', tone: 'sky' }, { label: 'Integrations', tone: 'plain' },
  { label: 'Product', tone: 'plain' }, { label: 'Research', tone: 'coral' },
];

export const AI_SPLIT = [
  { title: 'I hand to AI', items: ['Explaining code I haven’t seen before', 'First drafts of tests and boilerplate', 'Talking through edge cases', 'Narrowing down a bug'] },
  { title: 'I keep for myself', items: ['Architecture and data decisions', 'Reviewing every diff line by line', 'Security and user data', 'Deciding when it’s ready'] },
];

// Terminal script: [kind, text]. kind maps to the .tl.me / .tl.ai / .tl.ok styles.
export const TERMINAL_LINES = [
  ['me', 'which components still fetch shared data over REST?'],
  ['ai', 'Found 7 call sites. 4 can move to the shared GraphQL query; 3 need extra fields first.'],
  ['me', 'draft the resolver changes for the extra fields'],
  ['ai', 'Updated the resolver and the Prisma select.'],
  ['ok', '✓ read every line · fixed an N+1 · tests passing'],
  ['me', 'open the PR, I’ll write the description'],
];
