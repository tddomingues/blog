import Link from "next/link";
import Image from "next/image";
import { Card } from "./ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Calendar, UserRound } from "lucide-react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import PostProps from "../types/post";

interface ListAllPostsProps {
  posts: PostProps[];
}

const ListAllPosts = async ({ posts }: ListAllPostsProps) => {
  return (
    <div className="flex-1">
      <div className="mb-1">
        <h2 className="text-xl font-extrabold">Todas as Postagens</h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 w-full">
        {posts.map((post, index) => (
          <Card key={index} className="flex flex-col gap-2">
            {" "}
            {/* lg:max-w-[400px] */}
            <div className="relative h-[200px] w-full">
              <Image
                alt={post.title}
                src={post.image}
                fill
                className="object-cover rounded-t-xl"
              />
            </div>
            <div className="px-2 mt-1">
              <Badge variant="outline" className="text-sm font-normal mr-2">
                <span className="mr-2">
                  <UserRound size={16} />
                </span>
                {post.user.name}
              </Badge>
              <Badge variant="outline" className="text-sm font-normal">
                <span className="mr-2">
                  <Calendar size={16} />
                </span>
                {format(post.create_at, "d MMM, yyyy", {
                  locale: ptBR,
                })}
              </Badge>
            </div>
            <div className="flex flex-col px-2 mb-4">
              <h1 className="font-bold text-xl line-clamp-2">{post.title}</h1>
              <p className="line-clamp-2 text-primary/80">{post.description}</p>
              <Link
                href={`/post/${post.id}`}
                className="font-bold underline mt-4"
              >
                Ler mais
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListAllPosts;
