import 'dotenv/config';

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET
  }
});
