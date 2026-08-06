import type { VercelRequest, VercelResponse } from "@vercel/node";
import { requireAdmin } from "../server/auth";
import { readStoredNotices, writeStoredNotices } from "../server/notices";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader("Cache-Control", "no-store, max-age=0");

  try {
    if (request.method === "GET") {
      const posts = await readStoredNotices();
      return response.status(200).json({ posts });
    }

    if (request.method === "PUT") {
      if (!requireAdmin(request, response)) return;
      const body = request.body && typeof request.body === "object" ? request.body : {};
      const posts = await writeStoredNotices(body.posts);
      return response.status(200).json({ posts });
    }

    return response.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Notice operation failed";
    return response.status(500).json({ error: message });
  }
}
