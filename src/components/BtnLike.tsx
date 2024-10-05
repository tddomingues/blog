"use client";

import { Button } from "@/src/components/ui/button";

import axios from "axios";

import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface HandleLikeProps {
  id_user: string;
  id_post: string;
}

const PostClient = ({ id_post, id_user }: HandleLikeProps) => {
  const [dynamicLike, setDynamicLike] = useState<boolean>(false);

  const router = useRouter();

  const handleLike = async () => {
    axios
      .put(`/api/post/${id_post}`, {
        next: {
          tags: ["put-post"],
        },
      })
      .then(() => {
        setDynamicLike(!dynamicLike);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Button
      className="mr-1 mt-[-2px] p-0"
      variant={"link"}
      onClick={() => handleLike()}
    >
      {/* <ThumbsUp
        className={cn(
          hasLiked
            ? "fill-blue-400 text-blue-400"
            : "fill-primary-foreground text-primary"
        )}
      /> */}
      <ThumbsUp className="fill-blue-400 text-blue-400" />
    </Button>
  );
};

export default PostClient;
