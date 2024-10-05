"use client";

import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";

import { useRouter } from "next/navigation";
import UserProps from "@/src/types/user";
import { useToast } from "@/src/hooks/use-toast";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Error } from "@/src/components/Error";
import { Textarea } from "@/src/components/ui/textarea";

const schema = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
  image: z.string().url(),
  category: z.string().nonempty(),
});

type FormFields = z.infer<typeof schema>;

interface CreatePostProps {
  user: UserProps | null;
}

const CreatePost = ({ user }: CreatePostProps) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image: "",
      category: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const newData = {
      ...data,
      like: 0,
      reading_time: 0,
      fk_user_id: user?.id,
    };

    axios
      .post("http://localhost:3000/api/post/create-post", newData)
      .then((res) => {
        toast({
          variant: "default",
          description: res.data.message,
        });
        setOpen(false);
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h2 className="my-8 text-5xl font-medium">Cria uma postagem</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col gap-4">
          <div className="">
            <Label className="mr-4 w-full">Título</Label>
            <Input className="l" {...register("title")} />
            {errors.title && (
              <Error message="Título obrigatório" className="" />
            )}
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
            <Select onValueChange={(value) => setValue("category", value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione um categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tecnologia</SelectLabel>
                  <SelectItem value="desenvolvimento">
                    Desenvolvimento
                  </SelectItem>
                  <SelectItem value="jogos">Jogos</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="cibersegurança">
                    Cibersegurança{" "}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.category && (
              <Error message="Insira uma categoria" className="" />
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Salvar</Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default CreatePost;
