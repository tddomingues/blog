import Navbar from "@/src/components/navbar/Navbar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";

import { currentUser } from "@/src/actions/getCurrentUser";
import calculateReadingTime from "@/src/lib/calculateReadingTime";
import { ThumbsUp } from "lucide-react";
import Image from "next/image";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getPosts } from "@/src/actions/getPosts";

const Post = async (props: any) => {
  const { params } = props;
  const user = await currentUser();
  const posts = await getPosts();

  const post = posts && posts.find((post) => post.id === params.id);

  if (!post) return <div>Post não encontrado</div>;

  return (
    <>
      <nav className="py-4 border-b">
        <div className="container">
          <Navbar user={user} />
        </div>
      </nav>
      <div className=" container flex gap-4 flex-col mt-4">
        <div className="w-full h-[300px] relative">
          <Image
            alt=""
            src={post?.image}
            fill
            className="object-cover object-center "
          />
          <div className="absolute bottom-4 left-4 ">
            <Badge variant="default" className="font-normal text-base">
              Tecnologia
            </Badge>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span>{user?.name}</span>
            <span className="text-sm">
              {calculateReadingTime(post.description)}s de leitura
            </span>
          </div>
          <div className="self-end">
            <span className="text-sm">
              {format(post.create_at, "d MMM, yyyy", { locale: ptBR })}
            </span>
          </div>
        </div>
        <div>
          <h2 className="text-5xl font-medium mt-4 ">{post?.title}</h2>

          <p className="mt-4">{post.description}</p>
        </div>

        <span className="flex items-center">
          <Button className="mr-1 mt-[-2px] p-0" variant={"link"}>
            <ThumbsUp className="hover:text-blue-500" />
          </Button>
          {post.like} curtidas
        </span>
      </div>
    </>
  );
};

export default Post;
