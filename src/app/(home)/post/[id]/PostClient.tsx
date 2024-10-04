"use client";

import { Button } from "@/src/components/ui/button";
import useLikePost from "@/src/hooks/useLikePost";
import { cn } from "@/src/lib/utils";
import axios from "axios";

import { ThumbsUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import Loading from "./loading";

interface HandleLikeProps {
  id_user: string;
  id_post: string;
}

const PostClient = ({ id_post, id_user }: HandleLikeProps) => {
  const [dynamicLike, setDynamicLike] = useState<boolean>(false);

  const { hasLiked, loading } = useLikePost(id_user, id_post, dynamicLike);

  const router = useRouter();

  const handleLike = async () => {
    axios
      .put(`/api/post/update/${id_post}`, {})
      .then(() => {
        router.refresh();
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
      <ThumbsUp
        className={cn(
          hasLiked
            ? "fill-blue-400 text-blue-400"
            : "fill-primary-foreground text-primary"
        )}
      />
    </Button>
  );
};

export default PostClient;
