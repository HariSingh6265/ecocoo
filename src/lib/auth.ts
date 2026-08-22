// ─── JWT Authentication Helpers ───

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "ecocommute-fallback-secret";

export interface AuthPayload {
  userId?: string;
  id?: string;
  email: string;
  role: "user" | "company" | "employee";
  name: string;
  companyId?: string;
  employeeId?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: Record<string, unknown>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): AuthPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  } catch {
    return null;
  }
}

// Works with both Next.js cookies() and req.cookies
export async function getAuthFromCookies(cookieSource?: { get: (name: string) => { value: string } | undefined }): Promise<AuthPayload | null> {
  try {
    let token: string | undefined;
    if (cookieSource) {
      token = cookieSource.get("ecocommute-token")?.value;
    } else {
      const { cookies } = await import("next/headers");
      const cookieStore = cookies();
      token = cookieStore.get("ecocommute-token")?.value;
    }
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

export function createAuthCookieHeader(token: string): string {
  return `ecocommute-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${7 * 24 * 60 * 60}`;
}
