"use client";

//components
import { Button } from "@/src/components/ui/button";

//icons
import { ThumbsUp } from "lucide-react";

//actions
import likePost from "../actions/likePost";

//lib
import { cn } from "../lib/utils";

//types
import PostProps from "../types/post";

interface HandleLikeProps {
  id_user: string;
  id_post: string;
  post: PostProps;
}

const Like = ({ id_post, id_user, post }: HandleLikeProps) => {
  const handleLike = async () => {
    const data = {
      id_post,
      id_user,
    };

    await likePost(data);
  };
  return (
    <>
      <Button
        className="mr-1 mt-[-2px] p-0 gap-1"
        variant={"link"}
        onClick={handleLike}
      >
        <ThumbsUp
          className={cn(
            post.likes.some((like) => like.fk_user_id === id_user)
              ? "fill-sky-500 text-sky-500"
              : "fill-primary-foreground text-primary/80"
          )}
        />
      </Button>
      <span className="text-sm text-primary/80">
        {post.likes.length} curtida(s)
      </span>
    </>
  );
};

export default Like;
