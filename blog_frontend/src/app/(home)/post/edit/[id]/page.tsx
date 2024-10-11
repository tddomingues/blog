//actions
import { getPosts } from "@/src/actions/getAllPosts";
import { currentUser } from "@/src/actions/getCurrentUser";

//components
import FormPost from "@/src/components/FormPost";
import { NoPost } from "@/src/components/NoPost";
import { Card } from "@/src/components/ui/card";

interface EditPostProps {
  params: {
    id: string;
  };
}

const EditPost = async ({ params }: EditPostProps) => {
  const posts = await getPosts();
  const user = await currentUser();

  const post = posts && posts.find((post) => post.id === params.id);

  if (!post) return <NoPost />;

  const defaultValuesForm = {
    title: post.title,
    description: post.description,
    image: post.image,
    category: post.category,
  };

  return (
    <div className="container">
      {user?.role === "admin" ? (
        <Card className="p-4 mt-8 ">
          <h2 className="mb-4 text-2xl font-bold">Editar Postagem</h2>
          <FormPost
            defaultValuesForm={defaultValuesForm}
            user={user}
            id_post={params.id}
            typePost="edit"
          />
        </Card>
      ) : (
        <h2 className="text-3xl font-extrabold text-center mt-4">
          Sem autorização
        </h2>
      )}
    </div>
  );
};

export default EditPost;
