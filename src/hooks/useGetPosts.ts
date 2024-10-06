import axios from "axios";
import { useEffect, useState } from "react";
import PostProps from "../types/post";

function useGetAllPosts() {
  const [posts, setPosts] = useState<PostProps[]>([]);

  async function getPosts() {
    const response = await axios.get("/api/post/get-all-posts");
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

function useGetMostLikedPosts() {
  const { posts } = useGetAllPosts();

  const mostLikedPosts =
    posts && posts.sort((a, b) => b.likes.length - a.likes.length).slice(0, 5);

  return {
    mostLikedPosts,
  };
}

function useGetFirstPost() {
  const { posts } = useGetAllPosts();
  const firstPost = posts && posts[0];

  return {
    firstPost,
  };
}

export { useGetAllPosts, useGetMostLikedPosts, useGetFirstPost };
