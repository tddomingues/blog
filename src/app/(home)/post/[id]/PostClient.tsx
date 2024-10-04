"use client";

import { likePost } from "@/src/actions/getPosts";
import { Button } from "@/src/components/ui/button";
import axios from "axios";
import { ThumbsUp } from "lucide-react";

interface HandleLikeProps {
  id_user: string;
  id_post: string;
}

const PostClient = ({ id_post, id_user }: HandleLikeProps) => {
  const handleLike = async () => {
    console.log(id_post);
    axios
      .put(`/api/post/update/${id_post}`, {})
      .then((res) => {
        console.log(res);
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
      <ThumbsUp className="hover:text-blue-500" />
    </Button>
  );
};

export default PostClient;
