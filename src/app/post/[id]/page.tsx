import Navbar from "@/src/components/navbar/Navbar";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import posts from "@/src/constants/posts";
import { currentUser } from "@/src/lib/auth";
import Image from "next/image";

const Post = async (props: any) => {
  const { params } = props;
  const user = await currentUser();

  const post = posts.find((post) => post.id === params.id);

  if (!post) return <div>Post não encontrado</div>;

  return (
    <nav className="py-4 border-b">
      {params.id}
      <div className="container">
        <Navbar user={user} />
      </div>
      <div className=" container flex flex-col bg-red-300">
        <div className="w-full h-[300px] relative">
          <Image alt="" src={post?.image} fill />
        </div>
        <h2>{post?.title}</h2>

        <p>Descrição</p>
        <div>
          <span>Autor Admin</span>
          <span>Criado em 12/12/2023</span>
        </div>
        <div className="w-full">
          <Badge variant="default">Tecnologia</Badge>
        </div>
        <span>
          <Button>Curtir</Button>
          232
        </span>
      </div>
    </nav>
  );
};

export default Post;
