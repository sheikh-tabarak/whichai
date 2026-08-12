import dbConnect from "@/app/api/server";
import aitools from "@/models/aitool";
import { validateAdminAuth, jsonResponse, handleCorsOptions } from "@/lib/adminAuth";

export async function OPTIONS() {
    return handleCorsOptions();
}

export async function GET(request, { params }) {
    const auth = validateAdminAuth(request);
    if (!auth.authorized) return auth.response;

    await dbConnect();

    try {
        const tool = await aitools.findById(params.id).populate("category").exec();
        if (!tool) {
            return jsonResponse({ error: "AI Tool not found" }, 444);
        }
        return jsonResponse(tool);
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
}

export async function PATCH(request, { params }) {
    const auth = validateAdminAuth(request);
    if (!auth.authorized) return auth.response;

    await dbConnect();

    try {
        const body = await request.json();
        
        // If action is passed e.g., { action: "approve" } or { action: "reject" }
        if (body.action === "approve") {
            body.status = "approved";
            delete body.action;
        } else if (body.action === "reject") {
            body.status = "rejected";
            delete body.action;
        }

        const updatedTool = await aitools.findByIdAndUpdate(
            params.id,
            { $set: body },
            { new: true, runValidators: true }
        ).populate("category");

        if (!updatedTool) {
            return jsonResponse({ error: "AI Tool not found" }, 404);
        }

        return jsonResponse({
            ok: true,
            message: "AI Tool updated successfully",
            tool: updatedTool,
        });
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
}

export async function DELETE(request, { params }) {
    const auth = validateAdminAuth(request);
    if (!auth.authorized) return auth.response;

    await dbConnect();

    try {
        const deletedTool = await aitools.findByIdAndDelete(params.id);
        if (!deletedTool) {
            return jsonResponse({ error: "AI Tool not found" }, 404);
        }

        return jsonResponse({
            ok: true,
            message: "AI Tool deleted successfully",
            deletedId: params.id,
        });
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
}
