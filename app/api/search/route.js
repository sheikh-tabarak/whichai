import aitools from "@/models/aitool"
// import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

export async function GET(request) {

    const query = request.nextUrl.searchParams.get('query')

    try {

        const aitool = await aitools
            .aggregate([
                {
                    $match: {
                        $or: [
                            { name: { $regex: query, $options: "i" } },
                            { posted_by: { $regex: query, $options: "i" } },
                            { category: { $regex: query, $options: "i" } },
                            { description: { $regex: query, $options: "i" } }
                        ]
                    }
                },
            ]);

        return NextResponse.json(aitool)
    }
    catch (e) {
        return NextResponse.json(e)
    }
}