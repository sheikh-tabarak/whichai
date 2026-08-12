import { NextResponse } from "next/server";
import dbConnect from "../server";
import aitools from "../../../models/aitool";
import axios from "axios";

export async function GET(request) {

    await dbConnect();

    try {
        // Only return approved tools for public GET requests
        const tools = await aitools.find({
            $or: [{ status: "approved" }, { status: true }]
        }).populate('category');
        return NextResponse.json(tools)
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(request) {

    await dbConnect()

    try {
        const body = await request.json();
        // Force status to 'pending' for public submissions until admin approval
        const newToolData = {
            ...body,
            status: "pending"
        };
        const aitool = new aitools(newToolData);
        const tooldata = await aitool.save();
        return NextResponse.json({ tooldata, ok: true, message: "Tool submitted successfully and is pending admin approval." });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

