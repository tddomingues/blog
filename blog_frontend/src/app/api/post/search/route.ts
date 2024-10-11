import { NextResponse } from "next/server";

//lib
import db from "@/src/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const search = searchParams.get("q");

  if (search === null || search === "" || search === undefined) {
    return NextResponse.json([]);
  }

  const post = await db.post.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    include: {
      user: true,
    },
  });

  if (!post) {
    return NextResponse.json([]);
  }

  return NextResponse.json(post);
}
