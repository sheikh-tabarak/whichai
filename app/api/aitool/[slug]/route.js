import { NextResponse } from "next/server";
import dbConnect from "../../server";
import aitools from "@/models/aitool";

export async function GET(request, { params }) {
    const { slug } = await params;
    await dbConnect();
    try {
        // Try finding by slug first, then by ID as fallback
        let tool = await aitools.findOne({ slug }).populate('category').exec();

        if (!tool && slug.match(/^[0-9a-fA-F]{24}$/)) {
            tool = await aitools.findById(slug).populate('category').exec();
        }

        if (!tool) {
            return NextResponse.json({ error: "Tool not found" }, { status: 404 });
        }

        return NextResponse.json(tool);
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
    }
}
