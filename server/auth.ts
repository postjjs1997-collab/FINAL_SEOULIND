import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const cookieName = "seoulind_admin_session";
const sessionDurationSeconds = 60 * 60 * 10;

function secureCookieAttribute() {
  return process.env.VERCEL_ENV === "production" || process.env.VERCEL_ENV === "preview" ? "; Secure" : "";
}

function parseCookies(header: string | undefined) {
  return Object.fromEntries(
    (header ?? "")
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .map((entry) => {
        const index = entry.indexOf("=");
        return index === -1 ? [entry, ""] : [entry.slice(0, index), decodeURIComponent(entry.slice(index + 1))];
      }),
  );
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function sessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not configured");
  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function verifyAdminPassword(id: string, password: string) {
  const expectedId = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedId || !passwordHash || !safeEqual(id, expectedId)) return false;

  const [salt, expectedHash] = passwordHash.split(":");
  if (!salt || !expectedHash) return false;
  const actualHash = scryptSync(password, salt, 64).toString("hex");
  return safeEqual(actualHash, expectedHash);
}

export function createAdminSessionCookie() {
  const expiresAt = Math.floor(Date.now() / 1000) + sessionDurationSeconds;
  const payload = `${process.env.ADMIN_USERNAME ?? "admin"}.${expiresAt}`;
  const token = `${payload}.${sign(payload)}`;
  return `${cookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly${secureCookieAttribute()}; SameSite=Strict; Max-Age=${sessionDurationSeconds}`;
}

export function clearAdminSessionCookie() {
  return `${cookieName}=; Path=/; HttpOnly${secureCookieAttribute()}; SameSite=Strict; Max-Age=0`;
}

export function isAdminRequest(request: VercelRequest) {
  try {
    const token = parseCookies(request.headers.cookie)[cookieName];
    if (!token) return false;
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    const [username, expiresAt, signature] = parts;
    if (username !== process.env.ADMIN_USERNAME || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
    return safeEqual(signature, sign(`${username}.${expiresAt}`));
  } catch {
    return false;
  }
}

export function requireAdmin(request: VercelRequest, response: VercelResponse) {
  if (isAdminRequest(request)) return true;
  response.status(401).json({ error: "Unauthorized" });
  return false;
}
