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
                destination: '/hub',
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
    }
}

module.exports = nextConfig
