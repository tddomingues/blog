"use client";

import { useEffect, useState } from "react";
import PostProps from "../types/post";
import axios from "axios";

export default function useGetPostsSearch(q: string) {
  const [posts, setPosts] = useState<PostProps[]>([]);

  async function getPostsSearch() {
    const res = await axios.get(`/api/post/search?q=${q}`);

    return res.data ?? [];
  }

  useEffect(() => {
    getPostsSearch().then(setPosts);
  }, []);

  return {
    posts,
  };
}
