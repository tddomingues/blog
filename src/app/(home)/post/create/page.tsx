//actions
import { currentUser } from "@/src/actions/user/getCurrentUser";

//components
import FormPost from "@/src/components/FormPost";
import { Card } from "@/src/components/ui/card";

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
        <Card className="p-4 mt-8 ">
          <h1 className="mb-4 text-2xl font-bold">Criar Postagem</h1>
          <FormPost
            user={user}
            defaultValuesForm={defaultValuesForm}
            typePost="create"
          />
        </Card>
      ) : (
        <h2 className="text-2xl font-bold text-center mt-4">Sem autorização</h2>
      )}
    </div>
  );
};

export default CreatePost;
