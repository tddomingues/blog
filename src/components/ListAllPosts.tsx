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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 h-full w-full">
      {posts.map((post, index) => (
        <Card key={index} className="flex flex-col gap-4">
          <div className="relative h-[200px] w-full ">
            <Image
              alt="imagem da postagem"
              src={post.image}
              fill
              className="object-cover object-center rounded-t-xl"
            />
          </div>

          <div className="px-4 mt-2">
            <Badge variant="outline" className="font-normal text-base mr-2">
              <span className="mr-2">
                <UserRound size={18} />
              </span>
              {post.user.name}
            </Badge>
            <Badge variant="outline" className="font-normal text-base">
              <span className="mr-2">
                <Calendar size={18} />
              </span>
              {format(post.create_at, "d MMM, yyyy", {
                locale: ptBR,
              })}
            </Badge>
          </div>
          <div className="flex flex-col gap-2 px-4 mb-4">
            <h1 className="font-medium text-xl line-clamp-2">{post.title}</h1>
            <p className="line-clamp-2">{post.description}</p>
            <Link href={`/post/${post.id}`} className="font-medium underline ">
              Ler mais
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ListAllPosts;
