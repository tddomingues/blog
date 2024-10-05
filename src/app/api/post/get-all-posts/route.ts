import db from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const posts = await db.post.findMany({});

  return NextResponse.json(posts);
}
