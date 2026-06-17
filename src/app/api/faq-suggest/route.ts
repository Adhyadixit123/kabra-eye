import { NextResponse } from "next/server";
import { suggestFaqs } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const rows = await suggestFaqs(q);
  const suggestions = rows.map((r: { question: string }) => r.question);
  return NextResponse.json({ suggestions });
}
