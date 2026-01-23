import React from 'react'
import ToolDetails from '@/app/components/ToolDetails';
import dbConnect from '@/app/api/server';
import aitools from '@/models/aitool';
import categories from '@/models/categories';
import fallbackData from '@/app/lib/fallbackData.json';

export async function generateMetadata({ params }) {
    try {
        const { slug } = await params;

        // Connect to DB and fetch tool
        await dbConnect();
        let tool = await aitools.findOne({ slug }).populate('category').exec();
        if (!tool && slug.match(/^[0-9a-fA-F]{24}$/)) {
            tool = await aitools.findById(slug).populate('category').exec();
        }

        // --- FALLBACK LOGIC ---
        if (!tool) {
            tool = fallbackData.tools.find(t => t.slug === slug || t._id === slug);
            if (tool) {
                // Attach category name for metadata if it's just an ID in fallback
                if (typeof tool.category === 'string') {
                    const cat = fallbackData.categories.find(c => c._id === tool.category);
                    tool.category = cat || { name: 'AI Tool' };
                }
            }
        }

        if (!tool) {
            return {
                title: 'Tool Not Found | Which AI',
                description: 'The requested AI tool could not be found in our directory.'
            }
        }

        const title = `${tool.name} - AI Tool Review, Pricing & Features | Which AI`;
        const description = tool.description || `Discover ${tool.name}, a powerful AI tool for ${tool.category?.name || 'productivity'} on Which AI.`;
        const keywords = [
            tool.name,
            `${tool.name} AI`,
            `${tool.name} alternative`,
            `${tool.name} pricing`,
            tool.category?.name || 'AI Tool',
            ...(tool.tags || [])
        ];

        const ogImage = `/api/og?title=${encodeURIComponent(tool.name)}&subtitle=${encodeURIComponent(tool.category?.name || 'AI Tool')}&type=Tool`;

        return {
            title: title,
            description: description,
            keywords: keywords,
            openGraph: {
                title: title,
                description: description,
                url: `/tool/${slug}`,
                images: [
                    {
                        url: ogImage,
                        width: 1200,
                        height: 630,
                        alt: `${tool.name} Preview`,
                    },
                ],
                type: 'article',
                tags: keywords,
            },
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: description,
                images: [ogImage],
            },
        };
    } catch (error) {
        console.error("Metadata Generation Error:", error);
        return {
            title: 'Which AI | Tool Details',
            description: 'Discover innovative AI tools on Which AI.',
        };
    }
}

export default async function ToolPage({ params }) {
    const { slug } = await params;
    return (
        <ToolDetails slug={slug} />
    )
}
