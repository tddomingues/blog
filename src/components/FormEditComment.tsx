import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editComment } from "../actions/posts/actions";

const schema = z.object({
  content: z.string().nonempty(),
});

type FormFields = z.infer<typeof schema>;

interface FormEditCommentProps {
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
  idComment: string;
  id_post: string;
}

const FormEditComment = ({
  setIsEditOpen,
  idComment,
  id_post,
}: FormEditCommentProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const newData = {
      ...data,
      id_message: idComment,
      id_post: id_post,
    };

    await editComment(newData);

    setIsEditOpen(false);
  };

  return (
    <form className="mt-1" onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        placeholder="Atualize seu comentário..."
        {...register("content")}
      />
      <div className="flex justify-end mt-2 gap-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setIsEditOpen(false)}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="default">
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default FormEditComment;
