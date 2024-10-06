import { currentUser } from "@/src/actions/getCurrentUser";
import FormCreatePost from "@/src/components/FormCreatePost";
import React from "react";

const CreatePost = async () => {
  const user = await currentUser();

  return (
    <div className="container">
      {user?.role === "admin" ? (
        <>
          <h2 className="my-8 text-5xl font-medium">Cria uma postagem</h2>
          <FormCreatePost user={user} />
        </>
      ) : (
        <h2 className="text-5xl font-medium text-center mt-4">
          Não existe usuário
        </h2>
      )}
    </div>
  );
};

export default CreatePost;
