import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, x-admin-api-key",
};

const getJwtSecret = () => process.env.JWT_SECRET || process.env.ADMIN_API_KEY || "devinsol_jwt_secret_key_2026_30d";

export function handleCorsOptions() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders,
    });
}

/**
 * Generate a JWT token valid for 1 year (365 days) by default
 */
export function generateAdminToken(extraPayload = {}, expiresIn = "365d") {
    const secret = getJwtSecret();
    const payload = {
        role: "admin",
        issuer: "WhichAI Admin System",
        ...extraPayload,
    };

    const token = jwt.sign(payload, secret, { expiresIn });
    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

    return { token, expiresIn, expiresAt };
}

/**
 * Verify JWT token
 */
export function verifyAdminToken(token) {
    try {
        const secret = getJwtSecret();
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
}

/**
 * Refresh an existing token (or valid expired token) to issue a new 30-day token
 */
export function refreshAdminToken(token) {
    try {
        const secret = getJwtSecret();
        // Ignore expiration check so token can be refreshed shortly after expiry
        const decoded = jwt.verify(token, secret, { ignoreExpiration: true });
        if (decoded && decoded.role === "admin") {
            return generateAdminToken({ refreshedAt: new Date().toISOString() });
        }
        return null;
    } catch (error) {
        return null;
    }
}

/**
 * Validate incoming admin requests via x-admin-api-key OR Authorization Bearer JWT Token
 */
export function validateAdminAuth(request) {
    const apiKey = request.headers.get("x-admin-api-key");
    const authHeader = request.headers.get("authorization");
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.substring(7) : null;

    const expectedKey = process.env.ADMIN_API_KEY || "devinsol_secret_admin_key_2026";

    // 1. Check API Key
    if (apiKey && apiKey === expectedKey) {
        return { authorized: true, authMethod: "apiKey" };
    }

    // 2. Check Bearer Token (Static API Key or JWT Token)
    if (bearerToken) {
        if (bearerToken === expectedKey) {
            return { authorized: true, authMethod: "apiKey" };
        }

        const decoded = verifyAdminToken(bearerToken);
        if (decoded) {
            return { authorized: true, authMethod: "jwt", decoded };
        }
    }

    return {
        authorized: false,
        response: NextResponse.json(
            { error: "Unauthorized. Invalid or missing Admin API Key or JWT token." },
            { status: 401, headers: corsHeaders }
        )
    };
}

export function jsonResponse(data, status = 200) {
    return NextResponse.json(data, {
        status,
        headers: corsHeaders,
    });
}
