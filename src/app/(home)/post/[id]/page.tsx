import { currentUser } from "@/src/actions/getCurrentUser";

import { getPosts } from "@/src/actions/getAllPosts";

import { NoPost } from "@/src/components/NoPost";
import PostById from "@/src/components/PostById";

const Post = async (props: any) => {
  const { params } = props;
  const user = await currentUser();
  const posts = await getPosts();

  return (
    <>
      {posts ? (
        <PostById posts={posts} user={user} post_id={params.id} />
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default Post;
