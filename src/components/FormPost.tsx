"use client";

import { useRouter } from "next/navigation";

import { Image as IconImage } from "lucide-react";

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
import Image from "next/image";
import { Card } from "./ui/card";

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
    getValues,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValuesForm,
    resolver: zodResolver(schema),
  });

  const image = watch("image");

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

  function isURL(str: string) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return pattern.test(str);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex flex-col gap-4">
        <div className="">
          <Label className="mr-4 w-full">Título</Label>
          <Input className="l" {...register("title")} />
          {errors.title && <Error message="Título obrigatório" />}
        </div>
        <div>
          <Label className="text-right mr-4">Conteúdo</Label>
          <Textarea className=" max-h-[200px]" {...register("description")} />
          {errors.description && <Error message="Conteúdo obrigatório" />}
        </div>

        <div>
          <Card className="relative mb-2 w-[200px] h-[200px] flex justify-center items-center">
            {image && (
              <Image
                alt="Pré-visualização da imagem de fundo da postagem." //https://i
                src={isURL(image) ? new URL(image).href : ""}
                fill
                className="object-cover rounded-lg"
              />
            )}
            <IconImage
              className="text-primary/20"
              size={25}
              strokeWidth={1.5}
            />
          </Card>
          <Label className="text-right mr-4">Link da imagem</Label>
          <Input className="" {...register("image")} />
          {errors.image && <Error message="Link da imagem obrigatório" />}
        </div>
        <div>
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
