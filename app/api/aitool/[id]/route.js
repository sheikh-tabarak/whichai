import { NextResponse } from "next/server";
import dbConnect from "../../server";
import aitools from "@/models/aitool";

export async function GET(request, content) {

    const aitoolid = content.params.id
    await dbConnect();
    try {
        const tool = await aitools.findById({ _id: aitoolid }).populate('category').exec()
        return NextResponse.json(tool)
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function PUT(request, content) {

    const aitoolsid = content.params.id
    const body = await request.json();

    await dbConnect();

    try {
        const data = await aitools.updateOne({ _id: aitoolsid }, { $set: body });
        return NextResponse.json({ data, ok: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }

}

export async function DELETE(request, content) {

    const aitoolid = content.params.id

    await dbConnect();
    const result = await aitools.deleteOne({ _id: aitoolid })
    return NextResponse.json({ ok: true, result })

}
