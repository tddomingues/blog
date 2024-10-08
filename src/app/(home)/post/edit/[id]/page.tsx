import { getPosts } from "@/src/actions/getAllPosts";
import { currentUser } from "@/src/actions/getCurrentUser";
import FormPost from "@/src/components/FormPost";
import PostProps from "@/src/types/post";
import { Edit2 } from "lucide-react";
import React from "react";

interface EditPostProps {
  params: any;
}

const EditPost = async ({ params }: EditPostProps) => {
  const posts = await getPosts();
  const user = await currentUser();

  const post = posts && posts.find((post) => post.id === params.id);

  if (!post) return null;

  const defaultValuesForm = {
    title: post.title,
    description: post.description,
    image: post.image,
    category: post.category,
  };

  return (
    <div className="container">
      {user?.role === "admin" ? (
        <>
          <h2 className="my-8 text-3xl font-extrabold">Editar Postagem</h2>
          <FormPost
            defaultValuesForm={defaultValuesForm}
            user={user}
            id_post={params.id}
            typePost="edit"
          />
        </>
      ) : (
        <h2 className="text-5xl font-medium text-center mt-4">
          Sem autorização
        </h2>
      )}
    </div>
  );
};

export default EditPost;
