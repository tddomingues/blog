//actions
import { currentUser } from "@/src/actions/user/getCurrentUser";
import { getPosts } from "@/src/actions/posts/actions";

//components
import ListAllPosts from "@/src/components/ListAllPosts";
import NewestPost from "@/src/components/NewestPost";
import { NoPost } from "@/src/components/NoPost";
import ListMostLikedPosts from "@/src/components/ListMostLikedPosts";
import BtnCreatePost from "@/src/components/BtnCreatePost";

export const Page = async () => {
  const user = await currentUser();

  const posts = await getPosts();

  return (
    <>
      <div className="flex justify-end my-4 container">
        {user?.role === "ADMIN" && <BtnCreatePost />}
      </div>
      {posts.length > 0 ? (
        <div className="flex flex-col gap-6 container">
          <NewestPost post={posts[0]} />
          {posts.length > 1 && (
            <div className="flex flex-col gap-6 lg:flex-row-reverse lg:justify-between">
              <ListMostLikedPosts posts={posts} />
              <ListAllPosts posts={posts.slice(1)} />
            </div>
          )}
        </div>
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default Page;
