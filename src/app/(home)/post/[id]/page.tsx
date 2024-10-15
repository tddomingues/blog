//actions
import { currentUser } from "@/src/actions/user/getCurrentUser";
import { getPostById } from "@/src/actions/posts/actions";

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
  const post = await getPostById(params.id);

  return <>{post ? <PostById post={post} user={user} /> : <NoPost />}</>;
};

export default Post;
