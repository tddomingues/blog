//actions
import { currentUser } from "@/src/actions/user/getCurrentUser";

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
    <div className="container">
      <div className="mt-8 ">
        <h1 className="mb-4 text-2xl font-bold">Criar Postagem</h1>
        {user && (
          <FormPost
            user={user}
            defaultValuesForm={defaultValuesForm}
            typePost="create"
          />
        )}
      </div>
    </div>
  );
};

export default CreatePost;
