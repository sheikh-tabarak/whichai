export default function robots() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://whichai.sheikhtabarak.me';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/api/auth/',
                '/api/admin/',
                '/admin/',
                '/dashboard/',
                '/private/',
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
