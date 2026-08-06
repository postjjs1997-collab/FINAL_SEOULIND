import type { VercelRequest, VercelResponse } from "@vercel/node";
import { clearAdminSessionCookie } from "../../server/auth";

export default function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  response.setHeader("Set-Cookie", clearAdminSessionCookie());
  return response.status(200).json({ authenticated: false });
}
