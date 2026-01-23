import { NextResponse } from "next/server";
import dbConnect from "../server";
import aitools from "../../../models/aitool";
import categories from "../../../models/categories";
import axios from "axios";
import fs from 'fs';
import path from 'path';
import fallbackData from "../../lib/fallbackData.json";

const FALLBACK_PATH = path.join(process.cwd(), 'app/lib/fallbackData.json');

// Helper to update fallback JSON
async function updateFallbackJson() {
    try {
        await dbConnect();
        const [tools, cats] = await Promise.all([
            aitools.find({ status: true }).lean(),
            categories.find({}).lean()
        ]);

        const data = {
            tools: tools.map(t => ({ ...t, _id: t._id.toString(), category: t.category?.toString() })),
            categories: cats.map(c => ({ ...c, _id: c._id.toString() }))
        };

        fs.writeFileSync(FALLBACK_PATH, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Failed to update fallback JSON:", err);
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 24;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || 'All';
    const pricing = searchParams.get('pricing') || 'All';

    const skip = (page - 1) * limit;

    try {
        await dbConnect();

        const query = { status: true };

        if (search) {
            const searchRegex = new RegExp(search, 'i');
            query.$or = [
                { name: searchRegex },
                { description: searchRegex },
                { tags: { $in: [searchRegex] } }
            ];
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        if (pricing && pricing !== 'All') {
            query.pricing = pricing;
        }

        const [tools, total] = await Promise.all([
            aitools.find(query)
                .populate('category')
                .sort({ isFeatured: -1, isVerified: -1, dataCreated: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            aitools.countDocuments(query)
        ]);

        // Fallback if DB returns no results for the main query
        if (tools.length === 0 && search === '' && category === 'All' && pricing === 'All') {
            return NextResponse.json({
                tools: fallbackData.tools.slice(skip, skip + limit),
                pagination: {
                    total: fallbackData.tools.length,
                    pages: Math.ceil(fallbackData.tools.length / limit),
                    page,
                    hasMore: skip + limit < fallbackData.tools.length,
                    isFallback: true
                }
            });
        }

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
        console.error("API Error (Falling back to JSON):", error);

        // ALWAYS return fallback on catch if it's a general request
        return NextResponse.json({
            tools: fallbackData.tools.slice(skip, skip + limit),
            pagination: {
                total: fallbackData.tools.length,
                pages: Math.ceil(fallbackData.tools.length / limit),
                page,
                hasMore: skip + limit < fallbackData.tools.length,
                isFallback: true
            }
        });
    }
}

export async function POST(request) {

    await dbConnect()

    const body = await request.json();

    try {
        const aitool = new aitools(body);
        const tooldata = await aitool.save();

        // Update fallback JSON in the background
        updateFallbackJson().catch(console.error);

        return NextResponse.json({ tooldata, ok: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }
}

