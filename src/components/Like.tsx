"use client";

import { Button } from "@/src/components/ui/button";

import axios from "axios";

import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useOptimistic } from "react";

import PostProps from "../types/post";
import likePost from "../actions/likePost";

interface HandleLikeProps {
  id_user: string;
  id_post: string;
}

const Like = ({ id_post, id_user }: HandleLikeProps) => {
  const [dynamicLike, setDynamicLike] = useState<boolean>(false);

  const router = useRouter();

  // const [optimistic, setOptimistic] = useOptimistic(
  //   post.id_user_like,
  //   (state, newLike) => state.some(predicate) ? state.filter(like => like.)

  // );

  const handleLike = async () => {
    const data = {
      id_post,
      id_user,
    };
    console.log(data);

    await likePost(data);
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

export default Like;
