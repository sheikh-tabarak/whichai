import { NextResponse } from "next/server";
import dbConnect from "../server";
import aitools from "../../../models/aitool";
import axios from "axios";

export async function GET(request) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 24;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All';
    const pricing = searchParams.get('pricing') || 'All';

    const skip = (page - 1) * limit;

    const query = { status: true }; // Only show active tools

    // Search Filter
    if (search) {
        const searchRegex = new RegExp(search, 'i');
        query.$or = [
            { name: searchRegex },
            { description: searchRegex },
            { tags: { $in: [searchRegex] } }
        ];
    }

    // Category Filter
    if (category && category !== 'All') {
        query.category = category;
    }

    // Pricing Filter
    if (pricing && pricing !== 'All') {
        query.pricing = pricing;
    }

    try {
        const [tools, total] = await Promise.all([
            aitools.find(query)
                .populate('category')
                .sort({ isFeatured: -1, isVerified: -1, dataCreated: -1 }) // Featured > Verified > Newest
                .skip(skip)
                .limit(limit)
                .lean(),
            aitools.countDocuments(query)
        ]);

        return NextResponse.json({
            tools,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                hasMore: skip + tools.length < total
            }
        });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
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

