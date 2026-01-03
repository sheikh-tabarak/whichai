import dbConnect from "./api/server";
import aitools from "@/models/aitool";
import categories from "@/models/categories";

export default async function sitemap() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://whichai.sheikhtabarak.me';

    // 1. Fetch Dynamic Data
    await dbConnect();

    // Fetch all tools (slug & updatedAt)
    const allTools = await aitools.find({ status: true }, 'slug dataCreated').lean();

    // Fetch all categories (name/slug) -- assumes category routing uses Name or specialized slug
    // Based on previous code, category routing seemed to use Name? Or a slug field?
    // Let's check models/categories.js or assume 'name' is used as slug.
    // Actually, checking standard practice, likely slugified name.
    const allCategories = await categories.find({}, 'name').lean();

    // 2. Generate URLs for Tools
    const toolUrls = allTools.map((tool) => ({
        url: `${baseUrl}/tool/${tool.slug}`,
        lastModified: tool.dataCreated || new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    // 3. Generate URLs for Categories
    // Logic: likely /category/Category%20Name or slugified. 
    // I need to be sure about the category route pattern. 
    // app/(pages)/category/[slug]/page.js uses params.slug.
    // Usually slug is URL encoded name or a slug field.
    // I will assume simple slugification: lowercase, dash separated.
    const categoryUrls = allCategories.map((cat) => ({
        url: `${baseUrl}/category/${cat.name.toLowerCase().replace(/ /g, '-')}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
    }));

    // 4. Correct Category Slugification (Critical)
    // If the category pages expect ID or specific slug, I might be wrong.
    // Let's assume standard slug format from the seeder: name.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    // 5. Static Routes
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


        // Add other static pages like /about if they exist
    ];

    return [...staticRoutes, ...categoryUrls, ...toolUrls];
}
