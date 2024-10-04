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
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error } from "../Error";
import axios from "axios";
import UserProps from "../../types/user";
import { useToast } from "../../hooks/use-toast";
import { useRouter } from "next/navigation";

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

const ModalCreatePost = ({ user }: CreatePostProps) => {
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
      .post("http://localhost:3000/api/post", newData)
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
    <Dialog open={open} onOpenChange={setOpen}>
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
                className="col-span-3 max-h-[200px]"
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
            <div className="grid grid-cols-4 items-center">
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
                <Error
                  message="Insira uma categoria"
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

export default ModalCreatePost;
