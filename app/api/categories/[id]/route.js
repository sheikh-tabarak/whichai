import { NextResponse } from "next/server";
import dbConnect from "../../server";
import categories from "@/models/categories";

export async function GET(request, content) {

    const categoryid = content.params.id

    await dbConnect();
    
    try {
        const category = await categories.findById({ _id: categoryid })
        return NextResponse.json(category)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function PUT(request, content) {

    const categoryid = content.params.id
    const body = await request.json();

    await dbConnect();

    try {
        const data = await categories.updateOne({ _id: categoryid }, { $set: body });
        return NextResponse.json({ data, ok: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }

}

export async function DELETE(request, content) {

    const categoryid = content.params.id

    await dbConnect();
    const result = await categories.deleteOne({ _id: categoryid })
    return NextResponse.json({ ok: true, result })

}

