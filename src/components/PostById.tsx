"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "./ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Calendar, Edit2, UserRound } from "lucide-react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import PostProps from "../types/post";
import DeletePost from "./DeletePost";
import UserProps from "../types/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import calculateReadingTime from "../lib/calculateReadingTime";
import Like from "./Like";
import { NoPost } from "./NoPost";
import EditPost from "../app/(home)/post/edit/[id]/page";

interface PostByIdProps {
  posts: PostProps[];
  user: UserProps | null;
  post_id: string;
}

const PostById = ({ posts, user, post_id }: PostByIdProps) => {
  const post = posts.find((post) => post.id === post_id);

  return (
    <>
      {post ? (
        <div className=" container flex gap-4 flex-col mt-4">
          {user?.role === "admin" && (
            <div className="self-end flex gap-4">
              <DeletePost id_post={post!.id} />
              <Link
                href={`edit/${post.id}`}
                className="flex items-center gap-1 cursor-pointer transition-colors duration-200 hover:text-sky-400"
              >
                <Edit2 />
                Editar
              </Link>
            </div>
          )}
          <div className="w-full h-[400px] relative">
            <Image
              alt=""
              src={post!.image}
              fill
              className="object-cover object-center"
            />
            <div className="absolute bottom-4 left-4 ">
              <Badge
                variant="default"
                className="font-normal text-base capitalize"
              >
                {post?.category}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <div className="bg-chart-2 grid place-items-center rounded-full h-10 w-10 cursor-pointer">
              <span className="font-medium text-primary-foreground text-lg">
                {post.user.name![0].toUpperCase()}
              </span>
            </div>

            <div className="flex flex-col">
              <span>{post!.user.name}</span>
              <span className="text-sm">
                {calculateReadingTime(post!.description)}s de leitura
              </span>
            </div>
            <div>
              <span className="text-sm">
                {format(post!.create_at, "d MMM, yyyy", { locale: ptBR })}
              </span>
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-5xl font-medium mt-4 ">{post!.title}</h2>

            <p className="mt-4 ">{post!.description}</p>
          </div>
          <span className="flex items-center">
            {user && (
              <Like id_post={post!.id} id_user={user?.id || ""} post={post} />
            )}
          </span>
        </div>
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default PostById;
