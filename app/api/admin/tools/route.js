import dbConnect from "@/app/api/server";
import aitools from "@/models/aitool";
import { validateAdminAuth, jsonResponse, handleCorsOptions } from "@/lib/adminAuth";

export async function OPTIONS() {
    return handleCorsOptions();
}

export async function GET(request) {
    const auth = validateAdminAuth(request);
    if (!auth.authorized) return auth.response;

    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);

        const search = searchParams.get("search") || "";
        const statusFilter = searchParams.get("status") || "all";
        const categoryFilter = searchParams.get("category") || "";
        const sortBy = searchParams.get("sortBy") || "dataCreated";
        const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;

        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "20", 10);
        const skip = (page - 1) * limit;

        const queryConditions = [];

        // Status Filter
        if (statusFilter === "pending") {
            queryConditions.push({ $or: [{ status: "pending" }, { status: false }] });
        } else if (statusFilter === "approved") {
            queryConditions.push({ $or: [{ status: "approved" }, { status: true }] });
        } else if (statusFilter === "rejected") {
            queryConditions.push({ status: "rejected" });
        }

        // Category Filter
        if (categoryFilter) {
            queryConditions.push({ category: categoryFilter });
        }

        // Search Filter
        if (search.trim()) {
            const regex = new RegExp(search.trim(), "i");
            queryConditions.push({
                $or: [
                    { name: regex },
                    { description: regex },
                    { posted_by: regex },
                    { posted_by_email: regex },
                    { tags: regex },
                ],
            });
        }

        const mongoQuery = queryConditions.length > 0 ? { $and: queryConditions } : {};

        // Sort configuration
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder;

        const total = await aitools.countDocuments(mongoQuery);

        let queryBuilder = aitools
            .find(mongoQuery)
            .populate("category")
            .sort(sortOptions);

        if (limit > 0) {
            queryBuilder = queryBuilder.skip(skip).limit(limit);
        }

        const tools = await queryBuilder.exec();

        return jsonResponse({
            tools,
            pagination: {
                total,
                page,
                limit,
                totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
            },
        });
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
}
