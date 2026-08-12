import { generateAdminToken, jsonResponse, handleCorsOptions } from "@/lib/adminAuth";

export async function OPTIONS() {
    return handleCorsOptions();
}

export async function POST(request) {
    try {
        const body = await request.json().catch(() => ({}));
        const apiKey = body.apiKey || 
                       request.headers.get("x-admin-api-key") || 
                       request.headers.get("authorization")?.replace("Bearer ", "");

        const expectedKey = process.env.ADMIN_API_KEY || "devinsol_secret_admin_key_2026";

        if (!apiKey || apiKey !== expectedKey) {
            return jsonResponse(
                { error: "Invalid API Key provided for token generation." },
                401
            );
        }

        const tokenData = generateAdminToken({ client: body.client || "admin.devinsol.com" }, body.expiresIn || "365d");

        return jsonResponse({
            ok: true,
            message: "JWT Admin Token generated successfully (valid for 1 year).",
            token: tokenData.token,
            expiresIn: tokenData.expiresIn,
            expiresAt: tokenData.expiresAt,
            tokenType: "Bearer"
        });
    } catch (error) {
        return jsonResponse({ error: error.message }, 500);
    }
}
