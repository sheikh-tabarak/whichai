import { NextRequest, NextResponse } from "next/server";
import categories from "../../../models/categories";
import dbConnect from "../server";

export async function GET(request) {

    await dbConnect();

    try {
        const categorylist = await categories.find();
        return NextResponse.json(categorylist)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function POST(request) {

    await dbConnect()

    const body = await request.json();

    try {
        const category = new categories(body);
        const data = await category.save();
        return NextResponse.json({ data, ok: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }
}