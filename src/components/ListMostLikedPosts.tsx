import Link from "next/link";
import Image from "next/image";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

//components
import { Badge } from "@/src/components/ui/badge";
import { Card } from "./ui/card";

//types
import PostProps from "../types/post";

interface NewestPostProps {
  posts: PostProps[];
}

const ListMostLikedPosts = async ({ posts }: NewestPostProps) => {
  const mostLikedPosts = posts
    .sort((a, b) => b.likes.length - a.likes.length)
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-1">
      <div>
        <h2 className="text-xl font-extrabold">Mais Curtidos</h2>
      </div>
      <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden gap-2 lg:flex-col">
        {mostLikedPosts.map((post, index) => (
          <Link href={`/post/${post.id}`} key={index}>
            <Card className="flex justify-start w-[250px]">
              <div className="relative min-h-[100px] w-[100px]">
                <Image
                  alt={post.title}
                  src={post.image}
                  fill
                  className="object-cover rounded-l-xl"
                />
              </div>
              <div className="flex flex-col flex-1 items-start p-1">
                <Badge
                  variant="default"
                  className="font-normal capitalize text-xs"
                >
                  {post.category}
                </Badge>
                <span className="text-xs mt-1 text-primary/80">
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
    </div>
  );
};

export default ListMostLikedPosts;
