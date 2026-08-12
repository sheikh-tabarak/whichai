import aitools from "@/models/aitool"
import dbConnect from "../server"
import { NextResponse } from "next/server"

export async function GET(request) {

    const query = request.nextUrl.searchParams.get('query') || ""

    try {
        await dbConnect();

        const matchConditions = [];

        if (query.trim()) {
            matchConditions.push({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { posted_by: { $regex: query, $options: "i" } },
                    { description: { $regex: query, $options: "i" } }
                ]
            });
        }

        matchConditions.push({
            $or: [{ status: "approved" }, { status: true }]
        });

        const aitool = await aitools.aggregate([
            {
                $match: {
                    $and: matchConditions
                }
            }
        ]);

        return NextResponse.json(aitool)
    }
    catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 })
    }
}