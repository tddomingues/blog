//actions
import { currentUser } from "@/src/actions/getCurrentUser";

//components
import FormPost from "@/src/components/FormPost";

const CreatePost = async () => {
  const user = await currentUser();

  const defaultValuesForm = {
    title: "",
    description: "",
    image: "",
    category: "",
  };

  return (
    <div className="lg:container">
      {user?.role === "admin" ? (
        <>
          <h1 className="mt-8 mb-4 text-2xl font-bold">Criar Postagem</h1>
          <FormPost
            user={user}
            defaultValuesForm={defaultValuesForm}
            typePost="create"
          />
        </>
      ) : (
        <h2 className="text-2xl font-bold text-center mt-4">Sem autorização</h2>
      )}
    </div>
  );
};

export default CreatePost;
