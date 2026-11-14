// Tool groups. Each item is [icon name, label].
export const STACK = [
  { id: 'cloud', title: 'Cloud & infrastructure', items: [
    ['aws', 'AWS'], ['ec2', 'EC2'], ['s3', 'S3'], ['rds', 'RDS'], ['lambda', 'Lambda'], ['cognito', 'Cognito'],
    ['cloud', 'CloudFront'], ['cloudflare', 'Cloudflare'], ['terraform', 'Terraform'], ['docker', 'Docker'], ['gha', 'GitHub Actions'], ['oracle', 'Oracle DB'],
  ] },
  { id: 'back', title: 'Backend & data', items: [
    ['python', 'Python'], ['django', 'Django'], ['node', 'Node.js'], ['nest', 'NestJS'], ['express', 'Express'], ['graphql', 'GraphQL'],
    ['hook', 'Webhooks'], ['prisma', 'Prisma'], ['pg', 'PostgreSQL'], ['mongo', 'MongoDB'], ['firebase', 'Firebase'], ['stripe', 'Stripe'],
  ] },
  { id: 'front', title: 'Frontend & mobile', items: [
    ['ts', 'TypeScript'], ['react', 'React'], ['react', 'React Native'], ['next', 'Next.js'], ['remix', 'Remix'],
    ['rq', 'React Query'], ['chakra', 'Chakra UI'], ['flutter', 'Flutter'], ['shopify', 'Shopify'],
  ] },
  { id: 'tools', title: 'Data & tools', items: [
    ['mixpanel', 'Mixpanel'], ['metabase', 'Metabase'], ['git', 'Git'], ['postman', 'Postman'], ['figma', 'Figma'],
  ] },
];
