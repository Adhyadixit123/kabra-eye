import { NextResponse } from "next/server";
import { searchFaqs } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const faqs = await searchFaqs(q);
  return NextResponse.json({ faqs });
}
