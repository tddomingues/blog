import axios from "axios";
import { useEffect, useState } from "react";
import PostProps from "../types/post";

export default function useGetPosts() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  async function getPosts() {
    const response = await axios.get("/api/post");
    const posts = response.data;
    return posts ?? [];
  }

  useEffect(() => {
    getPosts().then(setPosts);
  }, []);

  return {
    posts,
  };
}
