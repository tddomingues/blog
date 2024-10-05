import db from "@/src/lib/db";
import { NextResponse } from "next/server";

interface ParamsProps {
  id?: string;
}

export async function GET(
  request: Request,
  { params }: { params: ParamsProps }
) {
  const postId = params.id;

  const posts = await db.post.findFirst({
    where: {
      id: postId,
    },
  });

  return NextResponse.json(posts);
}
