import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createAdminSessionCookie, verifyAdminPassword } from "../../server/auth.js";

export default function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  const body = request.body && typeof request.body === "object" ? request.body : {};
  const id = typeof body.id === "string" ? body.id : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!verifyAdminPassword(id, password)) return response.status(401).json({ error: "Invalid credentials" });
  response.setHeader("Set-Cookie", createAdminSessionCookie());
  return response.status(200).json({ authenticated: true });
}
