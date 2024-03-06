/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// eslint-disable-next-line import/extensions
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'd2norla3tyc4cn.cloudfront.net',
                port: '',
                pathname: '/i/s3/**',
            },
        ],
    },
};

export default config;
