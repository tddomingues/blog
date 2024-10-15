"use client";

import { useRouter } from "next/navigation";

//actions
import { createPost, editPost } from "@/src/actions/posts/actions";

//components
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Error } from "@/src/components/Error";
import { Textarea } from "@/src/components/ui/textarea";

//hooks
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../hooks/use-toast";
import { z } from "zod";

//types
import UserProps from "../types/user";
import PostProps from "../types/post";

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  image: z.string().url(),
  category: z.string().nonempty(),
});

type FormFields = z.infer<typeof schema>;

interface FormPostProps {
  user: Pick<UserProps, "id" | "image" | "email" | "role" | "name">;
  defaultValuesForm: Pick<
    PostProps,
    "title" | "description" | "image" | "category"
  >;
  typePost: "create" | "edit";
  id_post?: string;
}

const FormPost = ({
  user,
  defaultValuesForm,
  typePost,
  id_post,
}: FormPostProps) => {
  const router = useRouter();

  const { toast } = useToast();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValuesForm,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      if (typePost === "create") {
        const newData = {
          ...data,
          fk_user_id: user.id,
        };

        const res = await createPost(newData);

        console.log("FORÇANDO ERRO", res);

        if (res.status) {
          toast({
            variant: "default",
            description: "Postagem criada com sucesso",
          });

          router.replace("/");
        }

        if (res.error) {
          toast({
            variant: "destructive",
            description: res.error,
          });
        }
      }

      if (typePost === "edit" && id_post) {
        const newData = {
          ...data,
          id: id_post,
        };

        const res = await editPost(newData);

        if (res.status) {
          toast({
            variant: "default",
            description: "Postagem editada com sucesso",
          });

          router.replace(`/post/${id_post}`);
        }

        if (res.error) {
          toast({
            variant: "default",
            description: res.error,
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col gap-4">
        <div className="">
          <Label className="mr-4 w-full">Título</Label>
          <Input className="l" {...register("title")} />
          {errors.title && <Error message="Título obrigatório" />}
        </div>
        <div className="">
          <Label className="text-right mr-4">Conteúdo</Label>
          <Textarea className=" max-h-[200px]" {...register("description")} />
          {errors.description && <Error message="Conteúdo obrigatório" />}
        </div>
        <div className="">
          <Label className="text-right mr-4">Link da imagem</Label>
          <Input className="" {...register("image")} />
          {errors.image && <Error message="Link da imagem obrigatório" />}
        </div>
        <div className="">
          <Label className="text-right mr-4">Categorias</Label>
          <Select
            onValueChange={(value) => setValue("category", value)}
            defaultValue={defaultValuesForm.category || ""}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione um categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="desenvolvimento">Desenvolvimento</SelectItem>
                <SelectItem value="jogos">Jogos</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="cibersegurança">Cibersegurança </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {errors.category && <Error message="Insira uma categoria" />}
        </div>
      </div>

      <div className="flex justify-between w-full mt-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            if (typePost === "create") {
              router.replace("/");
            }

            if (typePost === "edit") {
              router.replace(`/post/${id_post}`);
            }
          }}
        >
          Voltar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
};

export default FormPost;
