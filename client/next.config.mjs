// @type {import('next').NextConfig}


const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/upload',
                destination: 'http://localhost:8080/upload'
            },
            {
                source: '/ask',
                destination: 'http://localhost:8080/ask'
            }
        ];
    }
};

export default nextConfig;
