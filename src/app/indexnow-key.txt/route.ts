import { NextResponse } from "next/server";

export const dynamic = "force-static";

const indexNowKey =
  process.env.NEXT_PUBLIC_INDEXNOW_KEY ?? "1f1c0f1d8f83426a9b9f5fdce0e5f9f7";

export function GET() {
  return new NextResponse(indexNowKey, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
