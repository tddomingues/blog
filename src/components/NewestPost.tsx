import Link from "next/link";
import Image from "next/image";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

//components
import { Card } from "./ui/card";
import { Badge } from "@/src/components/ui/badge";

//types
import PostProps from "../types/post";

interface NewestPostProps {
  post: PostProps;
}

const NewestPost = async ({ post }: NewestPostProps) => {
  return (
    <Card className="flex flex-col gap-2 relative">
      <div className="p-3">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="line-clamp-2 text-primary/80">{post.description}</p>
      </div>

      <Link href={`/post/${post.id}`}>
        <div className="relative w-full h-[300px] ">
          <Image
            alt={post.title}
            src={post.image}
            fill
            className="object-cover rounded-b-xl"
          />
        </div>
      </Link>

      <div className="absolute bottom-3 left-3">
        <Badge
          variant="default"
          className="text-sm font-normal capitalize mr-2"
        >
          {format(post.create_at, "d MMM, yyyy", {
            locale: ptBR,
          })}
        </Badge>
        <Badge variant="default" className="text-sm font-normal  capitalize">
          {post.category}
        </Badge>
      </div>
    </Card>
  );
};

export default NewestPost;
