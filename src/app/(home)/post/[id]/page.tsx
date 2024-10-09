//actions
import { currentUser } from "@/src/actions/getCurrentUser";
import { getPosts } from "@/src/actions/getAllPosts";

//components
import { NoPost } from "@/src/components/NoPost";
import PostById from "@/src/components/PostById";

interface PostProps {
  params: {
    id: string;
  };
}

const Post = async (props: PostProps) => {
  const { params } = props;
  const user = await currentUser();
  const posts = await getPosts();

  const post = await posts.find((post) => post.id === params.id);

  return <>{post ? <PostById post={post} user={user} /> : <NoPost />}</>;
};

export default Post;
