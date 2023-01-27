const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
    unoptimized: true
  },
  // i18n: {
  //   locales: ['en'],
  //   defaultLocale: 'en',
  // },
  env: {
    NEXT_PUBLIC_WORDPRESS_URL: process.env.NEXT_PUBLIC_WORDPRESS_URL,
    FAUSTWP_SECRET_KEY: process.env.FAUSTWP_SECRET_KEY
  },
});
