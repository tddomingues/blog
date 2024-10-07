import { currentUser } from "@/src/actions/getCurrentUser";
import FormPost from "@/src/components/FormPost";
import React from "react";

const CreatePost = async () => {
  const user = await currentUser();

  const defaultValuesForm = {
    title: "",
    description: "",
    image: "",
    category: "",
  };

  return (
    <div className="container">
      {user?.role === "admin" ? (
        <>
          <h2 className="my-8 text-5xl font-medium">Criar Postagem</h2>
          <FormPost
            user={user}
            defaultValuesForm={defaultValuesForm}
            typePost="create"
          />
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
