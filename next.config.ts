import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  logging: { fetches: { fullUrl: true } },
  env: {
    // APPLICATION VARIABLE
    APP_NAME: process.env.APP_NAME,
    API_BASE_URL: process.env.API_BASE_URL,
    API_SUFFIX_URL: process.env.API_SUFFIX_URL,
    // GOOGLE RE-CAPTCHA v3 to make here: https://www.google.com/recaptcha/admin
    CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY,
    CAPTCHA_SECRET_KEY: process.env.CAPTCHA_SECRET_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
