import { currentUser } from "@/src/actions/getCurrentUser";
import _posts from "@/src/constants/posts";

import Link from "next/link";

import ListAllPosts from "@/src/components/ListAllPosts";
import { getPosts } from "@/src/actions/getAllPosts";
import NewestPost from "@/src/components/NewestPost";
import { NoPost } from "@/src/components/NoPost";
import ListMostLikedPosts from "@/src/components/ListMostLikedPosts";
import { SquarePen } from "lucide-react";

export const Page = async () => {
  const user = await currentUser();

  const posts = await getPosts();

  return (
    <>
      {posts ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-end mt-4 container">
            {user?.role === "admin" && (
              <Link
                href={"/post/create"}
                className="flex items-center gap-2 transition-colors duration-200 hover:text-sky-400"
              >
                <SquarePen />
                Escrever
              </Link>
            )}
          </div>
          <div className="container">
            <NewestPost posts={posts} />
            <div className="flex justify-between gap-8">
              <ListAllPosts posts={posts.slice(1)} />
              <ListMostLikedPosts posts={posts} />
            </div>
          </div>
        </div>
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default Page;
