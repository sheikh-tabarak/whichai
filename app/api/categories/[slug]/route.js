import { NextResponse } from "next/server";
import dbConnect from "../../server";
import categories from "@/models/categories";

export async function GET(request, { params }) {
    const { slug } = await params;
    await dbConnect();

    try {
        let category = await categories.findOne({ slug });

        if (!category && slug.match(/^[0-9a-fA-F]{24}$/)) {
            category = await categories.findById(slug);
        }

        if (!category) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });
    }
}
