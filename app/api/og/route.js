import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

// export const runtime = 'edge';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Dynamic params
        const title = searchParams.get('title') || 'Which AI';
        const subtitle = searchParams.get('subtitle') || 'Explore the AI Empire';
        const type = searchParams.get('type') || 'Directory'; // Tool, Category, or Directory

        // Font loading (using standard fetch)
        const fontData = await fetch(
            'https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Bold.ttf'
        ).then((res) => res.arrayBuffer());

        // Load Favicon
        const faviconData = await readFile(join(process.cwd(), 'public', 'favicon.svg'));
        const faviconBase64 = faviconData.toString('base64');
        const faviconSrc = `data:image/svg+xml;base64,${faviconBase64}`;

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#020617', // slate-950
                        backgroundImage: 'radial-gradient(circle at 50% 100%, #1e293b 0%, #020617 50%)',
                        fontFamily: '"Poppins"',
                    }}
                >
                    {/* Background Accents */}
                    <div style={{
                        position: 'absolute',
                        top: '-20%',
                        left: '-10%',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        background: 'rgba(37, 99, 235, 0.15)', // blue-600 with opacity
                        filter: 'blur(100px)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: '-20%',
                        right: '-10%',
                        width: '600px',
                        height: '600px',
                        borderRadius: '50%',
                        background: 'rgba(147, 51, 234, 0.15)', // purple-600 with opacity
                        filter: 'blur(100px)',
                    }} />

                    {/* Logo / Brand */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                        {/* Icon using actual favicon.svg */}
                        <img src={faviconSrc} width="64" height="64" style={{ marginRight: 20 }} />

                        {/* Brand Name */}
                        <div style={{ display: 'flex', fontSize: 48, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                            <span style={{ color: '#f8fafc' }}>WHICH</span>
                            <span style={{ color: '#a855f7', marginLeft: 8 }}>AI</span>
                        </div>
                    </div>

                    {/* Main Title */}
                    <div
                        style={{
                            fontSize: 70,
                            fontWeight: 900,
                            background: 'linear-gradient(to bottom right, #ffffff, #94a3b8)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            textAlign: 'center',
                            maxWidth: '80%',
                            lineHeight: 1.1,
                            marginBottom: 20,
                            letterSpacing: '-0.03em',
                        }}
                    >
                        {title}
                    </div>

                    {/* Subtitle / Category Badge */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '8px 24px',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '99px',
                        }}
                    >
                        <span
                            style={{
                                fontSize: 16,
                                fontWeight: 700,
                                color: '#60a5fa', // blue-400
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                            }}
                        >
                            {type}
                        </span>
                        <span style={{ margin: '0 12px', color: '#475569' }}>/</span>
                        <span
                            style={{
                                fontSize: 18,
                                fontWeight: 500,
                                color: '#cbd5e1', // slate-300
                            }}
                        >
                            {subtitle}
                        </span>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                fonts: [
                    {
                        name: 'Poppins',
                        data: fontData,
                        style: 'normal',
                        weight: 700,
                    },
                ],
            }
        );
    } catch (e) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
