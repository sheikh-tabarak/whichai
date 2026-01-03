import React from 'react'
import ToolDetails from '@/app/components/ToolDetails';
import dbConnect from '@/app/api/server';
import aitools from '@/models/aitool';

export async function generateMetadata({ params }) {
    const { slug } = await params;

    // Connect to DB and fetch tool
    await dbConnect();
    let tool = await aitools.findOne({ slug }).populate('category').exec();
    if (!tool && slug.match(/^[0-9a-fA-F]{24}$/)) {
        tool = await aitools.findById(slug).populate('category').exec();
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
}

export default async function ToolPage({ params }) {
    const { slug } = await params;
    return (
        <ToolDetails slug={slug} />
    )
}
