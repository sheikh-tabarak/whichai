import { NextResponse } from "next/server";
import dbConnect from "../../../server";
import aitools from "@/models/aitool";
import categories from "@/models/categories";

export async function GET(request, { params }) {
    const { category: categoryParam } = await params;
    await dbConnect();
    try {
        let categoryId = categoryParam;

        // If it's not a valid ObjectId, assume it's a slug
        if (!categoryParam.match(/^[0-9a-fA-F]{24}$/)) {
            const category = await categories.findOne({ slug: categoryParam });
            if (category) {
                categoryId = category._id;
            } else {
                return NextResponse.json([]); // Category not found
            }
        }

        const tools = await aitools.find({ 'category': categoryId }).populate('category').exec();
        return NextResponse.json(tools);
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
    }
}