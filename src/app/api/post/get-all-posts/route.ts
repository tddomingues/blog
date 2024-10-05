import db from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const posts = await db.post.findMany({
    include: {
      likes: true,
    },
    orderBy: {
      create_at: "asc",
    },
  });

  return NextResponse.json(posts);
}
