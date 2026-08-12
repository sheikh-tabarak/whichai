import dbConnect from "@/app/api/server";
import aitools from "@/models/aitool";
import categories from "@/models/categories";
import { validateAdminAuth, jsonResponse, handleCorsOptions } from "@/lib/adminAuth";

export async function OPTIONS() {
    return handleCorsOptions();
}

export async function GET(request) {
    const auth = validateAdminAuth(request);
    if (!auth.authorized) return auth.response;

    try {
        const dbStatus = await dbConnect();

        const totalTools = await aitools.countDocuments();
        const pendingTools = await aitools.countDocuments({
            $or: [{ status: "pending" }, { status: false }]
        });
        const approvedTools = await aitools.countDocuments({
            $or: [{ status: "approved" }, { status: true }]
        });
        const rejectedTools = await aitools.countDocuments({ status: "rejected" });
        const totalCategories = await categories.countDocuments();

        const liveUrl = process.env.SERVER_LINK || "http://localhost:3000";
        const appName = process.env.APP_NAME || "WhichAI";

        return jsonResponse({
            appName,
            status: "healthy",
            liveUrl,
            dbConnected: !!dbStatus,
            metrics: {
                totalTools,
                pendingTools,
                approvedTools,
                rejectedTools,
                totalCategories,
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
}
