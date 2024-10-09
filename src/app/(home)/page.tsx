import Link from "next/link";

//actions
import { currentUser } from "@/src/actions/getCurrentUser";

//components
import ListAllPosts from "@/src/components/ListAllPosts";
import { getPosts } from "@/src/actions/getAllPosts";
import NewestPost from "@/src/components/NewestPost";
import { NoPost } from "@/src/components/NoPost";
import ListMostLikedPosts from "@/src/components/ListMostLikedPosts";

//icons
import { SquarePen } from "lucide-react";

export const Page = async () => {
  const user = await currentUser();

  const posts = await getPosts();

  return (
    <>
      <div className="flex justify-end my-4">
        {user?.role === "admin" && (
          <Link
            href={"/post/create"}
            className="flex items-center gap-2 transition-colors duration-200 text-primary/80 hover:text-sky-500"
          >
            <SquarePen size={18} strokeWidth={1.5} />
            <span className="text-sm">Escrever</span>
          </Link>
        )}
      </div>
      {posts?.length > 0 ? (
        <div className="flex flex-col gap-6">
          <NewestPost post={posts[0]} />
          <div className="flex flex-col gap-6 lg:flex-row-reverse lg:justify-between">
            <ListMostLikedPosts posts={posts} />
            <ListAllPosts posts={posts.slice(1)} />
          </div>
        </div>
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default Page;
