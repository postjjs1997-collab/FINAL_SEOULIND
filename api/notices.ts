import type { VercelRequest, VercelResponse } from "@vercel/node";
import { isAdminRequest, requireAdmin } from "../server/auth.js";
import { readStoredNotices, writeStoredNotices } from "../server/notices.js";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  response.setHeader("Cache-Control", "no-store, max-age=0");

  try {
    if (request.method === "GET") {
      const posts = await readStoredNotices();
      const includeUnpublished = request.query.includeUnpublished === "1" && isAdminRequest(request);
      return response.status(200).json({
        posts: includeUnpublished ? posts : posts?.filter((post) => post.published),
      });
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
