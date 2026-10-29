import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { brands } from "@/lib/brands";
import { IMAGE_TYPES, MAX_UPLOAD_BYTES, UPLOAD_DIR, UPLOAD_URL_PREFIX, slugify } from "@/lib/uploads";

// POST multipart form: file=<image>, brand=<slug>. Admin only (the proxy
// skips /api, so the session is checked here). Returns { url } to store in
// Product.imageUrl.
export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const ext = IMAGE_TYPES[file.type];
  if (!ext) return NextResponse.json({ error: "Use a JPG, PNG, WebP, AVIF or GIF image" }, { status: 400 });
  if (file.size > MAX_UPLOAD_BYTES) return NextResponse.json({ error: "Image is larger than 10 MB" }, { status: 400 });

  const brandInput = String(form?.get("brand") ?? "");
  const brand = brands.some((b) => b.slug === brandInput) ? brandInput : "misc";
  const base = slugify(file.name.replace(/\.[^.]+$/, "")) || "image";
  // Random suffix: never overwrites an existing upload, and lets the file be
  // cached forever (a new upload is always a new URL).
  const filename = `${base}-${randomBytes(4).toString("hex")}.${ext}`;

  const dir = path.join(UPLOAD_DIR, brand);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `${UPLOAD_URL_PREFIX}/${brand}/${filename}` });
}
