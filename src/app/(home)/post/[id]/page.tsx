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
            <div className="mt-2">
              <form className="relative">
                <Input placeholder="Escreva seu comentário" className="pr-14" />
                <Button className="absolute right-0 top-0" variant="link">
                  <SendHorizontal className="text-sky-500 hover:text-sky-500/80" />
                </Button>
              </form>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2">
                <div className="bg-chart-2 grid place-items-center rounded-full h-8 w-8 cursor-pointer">
                  <span className="font-medium text-primary-foreground text-lg">
                    {post.user.name![0].toUpperCase()}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm">{post!.user.name}</span>
                  <span className="text-xs text-primary/80 flex gap-1">
                    {/* TODO: É A DATA DE CRIAÇÃO DA MENSAGEM */}
                    {format(post.create_at, "dd/MM/yyyy 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </span>
                </div>
              </div>
              <div className="mt-1">
                <p className="text-sm">
                  Cras aliquam felis sed felis malesuada, in pretium libero
                  rhoncus. Duis imperdiet neque mi, eu eleifend elit porttitor a
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default Post;
