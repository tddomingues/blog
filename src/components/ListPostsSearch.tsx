"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import Link from "next/link";
import Image from "next/image";

//components
import { Card } from "./ui/card";
import { Badge } from "@/src/components/ui/badge";

//icons
import { Calendar, UserRound } from "lucide-react";

//types
import PostProps from "../types/post";

interface ListAllPostsProps {
  posts: PostProps[];
}

const ListPostsSearch = ({ posts }: ListAllPostsProps) => {
  return (
    <div className="flex-1">
      <div className="mt-8 mb-4">
        <h1 className="text-2xl font-bold">Sua Busca</h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-2 w-full">
        {posts.map((post, index) => (
          <Card key={index} className="flex flex-col gap-2">
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
              <h2 className="text-2xl font-bold line-clamp-2 mb-1">
                {post.title}
              </h2>
              <p className="line-clamp-2 text-primary/80">{post.description}</p>
              <Link
                href={`/post/${post.id}`}
                className="font-medium underline mt-4"
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

export default ListPostsSearch;
