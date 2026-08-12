import { NextResponse } from "next/server";
import dbConnect from "../../../server";
import aitools from "@/models/aitool";

export async function GET(request, content) {
    const categoryId = content.params.category;
    await dbConnect();
    try {
        const tools = await aitools.find({
            category: categoryId,
            $or: [{ status: "approved" }, { status: true }]
        }).populate('category').exec();
        return NextResponse.json(tools);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}