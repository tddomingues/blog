import Link from "next/link";
import Image from "next/image";
import { Card } from "./ui/card";
import { Badge } from "@/src/components/ui/badge";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import PostProps from "../types/post";

interface NewestPostProps {
  posts: PostProps[];
}

const ListMostLikedPosts = async ({ posts }: NewestPostProps) => {
  const mostLikedPosts =
    posts && posts.sort((a, b) => b.likes.length - a.likes.length).slice(0, 5);

  return (
    <div className="flex flex-col gap-2 w-[300px]">
      <div className="mb-4">
        <h2 className="text-2xl font-medium">Mais Curtidos</h2>
      </div>
      {mostLikedPosts.map((post, index) => (
        <Link href={`/post/${post.id}`} key={index}>
          <Card className="flex justify-start gap-2">
            <div className="relative min-h-[100px] w-[100px]">
              <Image
                alt="imagem da postagem"
                src={post.image}
                fill
                className="object-cover object-center rounded-l-xl"
              />
            </div>
            <div className="flex flex-col flex-1 items-start gap-1 p-2 ">
              <Badge
                variant="default"
                className="font-normal capitalize text-xs"
              >
                {post.category}
              </Badge>
              <span className="text-xs">
                {format(post.create_at, "dd MMMM yyyy", {
                  locale: ptBR,
                })}
              </span>
              <h3 className="font-medium line-clamp-2">{post.title}</h3>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ListMostLikedPosts;
