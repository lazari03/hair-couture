import path from "node:path";

// Admin-uploaded product images. They can't go in public/: the Docker image
// is rebuilt from git on every deploy, and Next only serves files that were
// in public/ at build time. So they live on the persistent data volume
// (UPLOAD_DIR, /data/uploads in Docker) and are served by the
// /assets/uploads/[...path] route under the same URL shape as the bundled
// /assets/products/* images.
export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");
export const UPLOAD_URL_PREFIX = "/assets/uploads";
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

export const IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export const CONTENT_TYPES: Record<string, string> = Object.fromEntries(
  Object.entries(IMAGE_TYPES).map(([type, ext]) => [ext, type]),
);

// One safe path segment: lowercase letters, digits, dashes, an optional
// image extension. Blocks traversal ("..", slashes) by construction.
export const SAFE_SEGMENT = /^[a-z0-9][a-z0-9-]*(\.(jpg|png|webp|avif|gif))?$/;

export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}
