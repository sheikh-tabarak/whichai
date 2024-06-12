import { NextResponse } from "next/server";
import dbConnect from "../../../server";
import aitools from "@/models/aitool";
// import mongoose from "mongoose";

export async function GET(request, content) {
    const aitoolid = content.params.category
    await dbConnect();
    try {
        const tools = await aitools.find({ 'category': { '_id': aitoolid } })
        return NextResponse.json(tools)
    } catch (error) {
        return NextResponse.json(error)
    }
}