import { NextResponse } from "next/server";
import dbConnect from "../server";
import aitools from "../../../models/aitool";

export async function GET(request) {

    await dbConnect();

    try {
        const tools = await aitools.find().populate('category').exec();
        return NextResponse.json(tools)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function POST(request) {

    await dbConnect()

    const body = await request.json();

    try {
        const aitool = new aitools(body);
        const tooldata = await aitool.save();
        return NextResponse.json({ tooldata, ok: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }
}

