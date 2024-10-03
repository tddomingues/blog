"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "./Error";
import axios from "axios";
import UserProps from "../types/user";

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  image: z.string().url(),
});

type FormFields = z.infer<typeof schema>;

interface CreatePostProps {
  user: UserProps | null;
}

const CreatePost = ({ user }: CreatePostProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const newData = {
      ...data,
      favorite: 0,
      reading_time: 62,
      category: "Tecnologia",
      fk_user_id: user?.id,
    };

    axios
      .post("http://localhost:3000/api/post/create", newData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Crie uma postagem</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Vamos criar uma postagem ?</DialogTitle>
            <DialogDescription>
              Deixe seus seguidores por dentro de assuntos legais.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center">
              <Label className="text-right mr-4">Título</Label>
              <Input className="col-span-3" {...register("title")} />
              {errors.title && (
                <Error
                  message="Título obrigatório"
                  className="col-start-2 col-span-3"
                />
              )}
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label className="text-right mr-4">Conteúdo</Label>
              <Textarea
                placeholder="Escreva seu contéudo."
                className="col-span-3"
                {...register("description")}
              />
              {errors.description && (
                <Error
                  message="Conteúdo obrigatório"
                  className="col-start-2 col-span-3"
                />
              )}
            </div>
            <div className="grid grid-cols-4 items-center">
              <Label className="text-right mr-4">Link da imagem</Label>
              <Input className="col-span-3" {...register("image")} />
              {errors.image && (
                <Error
                  message="Link da imagem obrigatório"
                  className="col-start-2 col-span-3"
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
