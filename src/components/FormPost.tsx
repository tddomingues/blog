"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

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

//actions
import action from "../actions/actions";

//types
import UserProps from "../types/user";

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  image: z.string().url(),
  category: z.string().nonempty(),
});

type FormFields = z.infer<typeof schema>;

interface FormPostProps {
  user: UserProps | null;
  defaultValuesForm: {
    title: string;
    description: string;
    image: string;
    category: string;
  };
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
    const newData = {
      ...data,
      reading_time: 0,
      fk_user_id: user!.id,
    };

    try {
      if (typePost === "create") {
        const res = await axios.post(
          "http://localhost:3000/api/post/create-post",
          newData
        );
        toast({
          variant: "default",
          description: res.data.message,
        });

        await action({ typePost: "create/delete" });
        router.replace("/");
      }

      if (typePost === "edit") {
        const res = await axios.put(
          `http://localhost:3000/api/post/edit-post/${id_post}`,
          newData
        );

        toast({
          variant: "default",
          description: res.data.message,
        });

        await action({ typePost: "edit", id_post });

        router.replace(`/post/${id_post}`);
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
          {errors.title && <Error message="Título obrigatório" className="" />}
        </div>
        <div className="">
          <Label className="text-right mr-4">Conteúdo</Label>
          <Textarea className=" max-h-[200px]" {...register("description")} />
          {errors.description && (
            <Error message="Conteúdo obrigatório" className="" />
          )}
        </div>
        <div className="">
          <Label className="text-right mr-4">Link da imagem</Label>
          <Input className="" {...register("image")} />
          {errors.image && (
            <Error message="Link da imagem obrigatório" className="" />
          )}
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
          {errors.category && (
            <Error message="Insira uma categoria" className="" />
          )}
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
