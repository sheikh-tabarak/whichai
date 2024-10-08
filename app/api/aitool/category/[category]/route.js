import { NextResponse } from "next/server";
import dbConnect from "../../../server";
import aitools from "@/models/aitool";

export async function GET(request, content) {
    const aitoolid = content.params.category
    await dbConnect();
    try {
        const tools = await aitools.find({ 'category': { '_id': aitoolid } }).populate('category').exec()
        return NextResponse.json(tools)
    } catch (error) {
        return NextResponse.json(error)
    }
}