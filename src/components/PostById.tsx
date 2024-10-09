"use client";

import Link from "next/link";
import Image from "next/image";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

//components
import { Badge } from "@/src/components/ui/badge";
import DeletePost from "./DeletePost";
import Like from "./Like";

//icons
import { Edit2 } from "lucide-react";

//types
import PostProps from "../types/post";
import UserProps from "../types/user";

//libs
import calculateReadingTime from "../utils/calculateReadingTime";

interface PostByIdProps {
  post: PostProps;
  user: UserProps | null;
}

const PostById = ({ post, user }: PostByIdProps) => {
  return (
    <div className="container flex gap-4 flex-col mt-8">
      {user?.role === "admin" && (
        <div className="self-end flex gap-4">
          <DeletePost id_post={post.id} />
          <Link
            href={`edit/${post.id}`}
            className="flex items-center gap-1 cursor-pointer transition-colors duration-200 text-primary/80 hover:text-sky-400"
          >
            <Edit2 size={16} strokeWidth={1.5} />
            <span className="text-sm">Editar</span>
          </Link>
        </div>
      )}
      <div className="w-full h-[300px] relative">
        <Image
          alt={post.title}
          src={post.image}
          fill
          className="object-cover"
        />
        <div className="absolute bottom-2 left-2 ">
          <Badge variant="default" className="text-sm font-normal capitalize">
            {post.category}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <div className="bg-chart-2 grid place-items-center rounded-full h-8 w-8 cursor-pointer">
          <span className="font-medium text-primary-foreground text-lg">
            {post.user.name![0].toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col">
          <span>{post!.user.name}</span>
          <span className="text-sm text-primary/80">
            {calculateReadingTime(post.description)}s de leitura
          </span>
        </div>
        <div className="self-end mb-[-1px]">
          <span className="text-sm text-primary/80">
            {format(post.create_at, "d MMM, yyyy", { locale: ptBR })}
          </span>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-bold mt-4 ">{post.title}</h1>

        <p className="mt-2 text-primary/80">{post.description}</p>
      </div>
      <span className="flex items-center">
        {user && (
          <Like id_post={post.id} id_user={user?.id || ""} post={post} />
        )}
      </span>
    </div>
  );
};

export default PostById;
