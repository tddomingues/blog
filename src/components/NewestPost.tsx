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

const NewestPost = async ({ posts }: NewestPostProps) => {
  const firstPost = posts[0];

  return (
    <div className="mb-9">
      <Card className="flex flex-col gap-4 relative">
        <div className="p-4">
          <h1 className="text-5xl font-medium">{firstPost?.title}</h1>
          <p className="text-2xl mt-2 line-clamp-2">{firstPost?.description}</p>
        </div>

        <Link href={`/post/${firstPost?.id}`}>
          <div className="relative w-full h-[400px] ">
            <Image
              alt="imagem da postagem"
              src={firstPost?.image!}
              fill
              className="object-cover object-center rounded-b-xl"
            />
          </div>
        </Link>

        <div className="absolute bottom-4 left-4">
          <Badge variant="default" className="font-normal text-base mr-2">
            {format(firstPost?.create_at!, "d MMM, yyyy", {
              locale: ptBR,
            })}
          </Badge>
          <Badge variant="default" className="font-normal text-base capitalize">
            {firstPost?.category}
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default NewestPost;
