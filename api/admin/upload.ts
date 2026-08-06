import type { VercelRequest, VercelResponse } from "@vercel/node";
import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { requireAdmin } from "../../server/auth";

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed" });
  if (!requireAdmin(request, response)) return;

  try {
    const result = await handleUpload({
      request,
      body: request.body as HandleUploadBody,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        maximumSizeInBytes: 8 * 1024 * 1024,
        addRandomSuffix: true,
        cacheControlMaxAge: 60 * 60 * 24 * 30,
      }),
    });
    return response.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Image upload failed";
    return response.status(400).json({ error: message });
  }
}
