/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                has: [
                    {
                        type: 'cookie',
                        key: 'user',
                    },
                ],
                permanent: false,
                destination: '/edt',
            },
            {
                source: '/',
                missing: [
                    {
                        type: 'cookie',
                        key: 'user',
                    },
                ],
                permanent: false,
                destination: '/login',
            }
        ]
    },
    output: 'standalone',
}

module.exports = nextConfig
