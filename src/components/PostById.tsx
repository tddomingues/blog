"use client";

import Link from "next/link";
import Image from "next/image";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

//components
import { Badge } from "@/src/components/ui/badge";
import Like from "./Like";
import AdaptiveDialogDelete from "./AdaptiveDialogDelete";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

//icons
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Edit2,
  EllipsisVertical,
  Trash2,
} from "lucide-react";

//types
import PostProps from "../types/post";
import UserProps from "../types/user";

//libs
import calculateReadingTime from "../utils/calculateReadingTime";
import IconUser from "./IconUser";
import { Button } from "./ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface PostByIdProps {
  post: PostProps;
  user: Pick<UserProps, "id" | "image" | "email" | "role" | "name"> | null;
}

const PostById = ({ post, user }: PostByIdProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const router = useRouter();

  return (
    <div className="flex gap-4 flex-col mt-4">
      <AdaptiveDialogDelete
        id={post.id}
        type="post"
        title="Excluir Postagem"
        description="Excluir sua postagem permanentemente?"
        isOpen={openDialog}
        setIsOpen={setOpenDialog}
      />
      <div className="flex justify-between">
        <Link href="/">
          <ArrowLeft className="hover:text-primary/80 duration-200" />
        </Link>
        {user?.role === "ADMIN" && (
          <DropdownMenu
            open={openDropdown}
            onOpenChange={() => {
              if (openDropdown) {
                setOpenDropdown(false);
              } else {
                setOpenDropdown(true);
              }
            }}
          >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button
                  onClick={() => {
                    router.push(`/post/edit/${post.id}`);
                  }}
                  variant="ghost"
                >
                  <Edit2
                    size={18}
                    strokeWidth={1.5}
                    className="text-primary hover:text-primary/80 duration-200"
                  />
                  <span className="ml-2 text-sm font-normal">Editar</span>
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setOpenDropdown(false);
                    setOpenDialog(true);
                  }}
                >
                  <Trash2 size={18} strokeWidth={1.5} />
                  <span className="ml-2 text-sm font-normal">Excluir</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
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
        <IconUser user={post.user} />
        <div className="flex flex-col">
          <span>{post!.user.name}</span>
          <span className="text-sm text-primary/80 flex gap-1">
            <BookOpen
              size={14}
              strokeWidth={1.5}
              className="text-primary/80 mt-[2px]"
            />
            {calculateReadingTime(post.description)}s de leitura
          </span>
        </div>
        <div className="self-end mb-[-1px]">
          <span className="text-sm text-primary/80 flex gap-1">
            <Calendar
              size={14}
              strokeWidth={1.5}
              className="text-primary/80 mt-[2px]"
            />
            {format(post.create_at, "d MMM, yyyy", { locale: ptBR })}
          </span>
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-2xl font-bold mt-4 ">{post.title}</h1>

        <p className="mt-2 text-primary/80">{post.description}</p>
      </div>
      <span className="flex items-center">
        {user && <Like id_post={post.id} id_user={user.id || ""} post={post} />}
      </span>
    </div>
  );
};

export default PostById;
