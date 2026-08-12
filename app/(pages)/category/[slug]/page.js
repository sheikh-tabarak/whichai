import React from 'react'
import CategoryDetails from '@/app/components/CategoryDetails';
import dbConnect from '@/app/api/server';
import categories from '@/models/categories';

export async function generateMetadata({ params }) {
    const { slug } = await params;

    // Connect to DB and fetch category
    await dbConnect();
    // Assuming category model has a slug field or we use ID. The route uses ID primarily for some reason?
    // Let's check api/categories/[slug].
    // Usually standard pattern is findOne({ slug }) || findById(slug).
    let category = await categories.findOne({ slug });
    if (!category && slug.match(/^[0-9a-fA-F]{24}$/)) {
        category = await categories.findById(slug);
    }

    if (!category) {
        return {
            title: 'Category Not Found | Which AI',
            description: 'The requested tool category could not be found.'
        }
    }

    const title = `Best ${category.name} AI Tools & Software (2026) | Which AI`;
    const description = category.description || `Explore the top-rated ${category.name} AI tools curated for professionals. Find the best software for your needs.`;
    const keywords = [
        category.name,
        `Best ${category.name} tools`,
        `${category.name} software`,
        'AI Directory',
        'Artificial Intelligence'
    ];

    const ogImage = `/api/og?title=${encodeURIComponent(category.name)}&subtitle=Top%20AI%20Tools&type=Category`;

    return {
        title: title,
        description: description,
        keywords: keywords,
        openGraph: {
            title: title,
            description: description,
            url: `/category/${slug}`,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: `${category.name} AI Tools`,
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [ogImage],
        },
    };
}

export default async function CategoryPage({ params }) {
    const { slug } = await params;
    return (
        <CategoryDetails slug={slug} />
    )
}
