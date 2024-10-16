//actions
import { currentUser } from "@/src/actions/user/getCurrentUser";
import { getPostById } from "@/src/actions/posts/actions";

//components
import { NoPost } from "@/src/components/NoPost";
import PostById from "@/src/components/PostById";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Badge } from "@/src/components/ui/badge";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { SendHorizontal } from "lucide-react";
import FormMessage from "@/src/components/FormMessage";
import ListMessages from "@/src/components/ListMessages";

interface PostProps {
  params: {
    id: string;
  };
}

const Post = async (props: PostProps) => {
  const { params } = props;

  const user = await currentUser();
  const post = await getPostById(params.id);

  return (
    <>
      {post ? (
        <div className="container">
          <PostById post={post} user={user} />
          <div className="mt-8">
            <h2 className="text-lg font-medium">Comentários da Comunidade</h2>
            {user && (
              <div className="mt-2">
                <FormMessage id_post={params.id} id_user={user?.id} />
              </div>
            )}
            <ListMessages messages={post.messages} />
          </div>
        </div>
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default Post;
