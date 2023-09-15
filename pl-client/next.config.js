/** @type {import('next').NextConfig} */
const nextConfig = {
    "images": {
        "remotePatterns": [
            {
                "hostname": "*",
                "protocol": "http"
            },
            {
                "hostname": "*",
                "protocol": "https"
            }
        ]
    },
    "output": "standalone",
    "webpack": (config) => {
        config.module.rules.push({
         test: /\.node/,
         use: 'raw-loader',
        });
    
        return config;
    }
}

module.exports = nextConfig
