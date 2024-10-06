import { currentUser } from "@/src/actions/getCurrentUser";
import _posts from "@/src/constants/posts";

import Link from "next/link";

import ListAllPosts from "@/src/components/ListAllPosts";
import { getPosts } from "@/src/actions/getAllPosts";
import NewestPost from "@/src/components/NewestPost";
import { NoPost } from "@/src/components/NoPost";
import ListMostLikedPosts from "@/src/components/ListMostLikedPosts";

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
                className="
            h-9 px-4 py-2 
            rounded-md 
            text-sm font-medium transition-colors 
            focus-visible:outline-none 
            focus-visible:ring-1 focus-visible:ring-ring 
            disabled:pointer-events-none disabled:opacity-50 
            bg-primary text-primary-foreground shadow hover:bg-primary/90"
              >
                Criar postagem
              </Link>
            )}
          </div>
          <div className="container">
            <NewestPost posts={posts} />
            <div className="flex justify-between gap-4">
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
