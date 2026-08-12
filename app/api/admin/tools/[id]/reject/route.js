import dbConnect from "@/app/api/server";
import aitools from "@/models/aitool";
import { validateAdminAuth, jsonResponse, handleCorsOptions } from "@/lib/adminAuth";

export async function OPTIONS() {
    return handleCorsOptions();
}

export async function POST(request, { params }) {
    const auth = validateAdminAuth(request);
    if (!auth.authorized) return auth.response;

    await dbConnect();

    try {
        const updatedTool = await aitools.findByIdAndUpdate(
            params.id,
            { $set: { status: "rejected" } },
            { new: true }
        ).populate("category");

        if (!updatedTool) {
            return jsonResponse({ error: "AI Tool not found" }, 404);
        }

        return jsonResponse({
            ok: true,
            message: "AI Tool has been rejected.",
            tool: updatedTool,
        });
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
}

export async function PATCH(request, context) {
    return POST(request, context);
}
