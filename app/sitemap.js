import dbConnect from "./api/server";
import aitools from "@/models/aitool";
import categories from "@/models/categories";
import fallbackData from "./lib/fallbackData.json";

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://whichai.sheikhtabarak.me';

    let allTools = [];
    let allCategories = [];

    // 1. Fetch Dynamic Data with Catch
    try {
        await dbConnect();
        allTools = await aitools.find({ status: true }, 'slug dataCreated').lean();
        allCategories = await categories.find({}, 'name slug').lean();
    } catch (error) {
        console.error("Sitemap DB Fetch Error, using fallback:", error);
    }

    // Use fallback if DB is empty or failed
    if (allTools.length === 0) {
        allTools = fallbackData.tools;
    }
    if (allCategories.length === 0) {
        allCategories = fallbackData.categories;
    }

    // 2. Generate URLs for Tools
    const toolUrls = allTools.map((tool) => ({
        url: `${baseUrl}/tool/${tool.slug}`,
        lastModified: tool.dataCreated || new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 3. Generate URLs for Categories
    const categoryUrls = allCategories.map((cat) => {
        // Use cat.slug if available, otherwise slugify name
        const slug = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return {
            url: `${baseUrl}/category/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        };
    });

    // 4. Static Routes
    const staticRoutes = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/tools`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/newtool`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/search`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ];

    return [...staticRoutes, ...categoryUrls, ...toolUrls];
}
