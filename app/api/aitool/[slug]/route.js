import { NextResponse } from "next/server";
import dbConnect from "../../server";
import aitools from "@/models/aitool";
import categories from "@/models/categories";
import fallbackData from "@/app/lib/fallbackData.json";

export async function GET(request, { params }) {
    try {
        const { slug } = await params;
        await dbConnect();

        // Try finding by slug first, then by ID as fallback
        let tool = await aitools.findOne({ slug }).populate('category').exec();

        if (!tool && slug.match(/^[0-9a-fA-F]{24}$/)) {
            tool = await aitools.findById(slug).populate('category').exec();
        }

        // --- FALLBACK LOGIC ---
        if (!tool) {
            const staticTool = fallbackData.tools.find(t => t.slug === slug || t._id === slug);
            if (staticTool) {
                // Manually link the category object for the frontend
                const cat = fallbackData.categories.find(c => c._id === staticTool.category);
                tool = { ...staticTool, category: cat };
            }
        }

        if (!tool) {
            return NextResponse.json({ error: "Tool not found" }, { status: 404 });
        }

        return NextResponse.json(tool);
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
