import { refreshAdminToken, generateAdminToken, jsonResponse, handleCorsOptions } from "@/lib/adminAuth";

export async function OPTIONS() {
    return handleCorsOptions();
}

export async function POST(request) {
    try {
        const body = await request.json().catch(() => ({}));
        
        const token = body.token || 
                      request.headers.get("authorization")?.replace("Bearer ", "") ||
                      request.headers.get("x-admin-api-key");

        if (!token) {
            return jsonResponse(
                { error: "Token is required for refresh." },
                400
            );
        }

        const refreshedData = refreshAdminToken(token);

        if (!refreshedData) {
            return jsonResponse(
                { error: "Invalid token or refresh unauthorized." },
                401
            );
        }

        return jsonResponse({
            ok: true,
            message: "JWT Admin Token refreshed successfully (valid for another 1 month).",
            token: refreshedData.token,
            expiresIn: refreshedData.expiresIn,
            expiresAt: refreshedData.expiresAt,
            tokenType: "Bearer"
        });
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
}
