import { readFile } from "node:fs/promises";
import path from "node:path";
import { CONTENT_TYPES, SAFE_SEGMENT, UPLOAD_DIR } from "@/lib/uploads";

// Serves admin uploads from UPLOAD_DIR (see lib/uploads.ts).
export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await params;
  if (segments.length !== 2 || !segments.every((s) => SAFE_SEGMENT.test(s))) {
    return new Response("Not found", { status: 404 });
  }
  const ext = segments[1].split(".").pop() ?? "";
  const type = CONTENT_TYPES[ext];
  if (!type) return new Response("Not found", { status: 404 });

  try {
    const data = await readFile(path.join(UPLOAD_DIR, ...segments));
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": type,
        // Upload names are unique, so a URL's content never changes.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
