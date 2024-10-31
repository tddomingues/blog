"use client";

import { SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createMessage } from "../actions/posts/actions";
import { Textarea } from "./ui/textarea";

const schema = z.object({
  content: z.string().nonempty(),
});

type FormFields = z.infer<typeof schema>;

interface FormMessageProps {
  id_user: string;
  id_post: string;
}

const FormMessage = ({ id_post, id_user }: FormMessageProps) => {
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
      id_post,
      id_user,
    };

    await createMessage(newData);

    reset();
  };

  return (
    <form className="relative" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <div>
          <Textarea
            placeholder="Escreva seu comentário..."
            className="pr-14"
            {...register("content")}
          />
        </div>
        <Button className="mt-2 self-end via-fuchsia-200" variant="secondary">
          Enviar Comentário
        </Button>
      </div>
    </form>
  );
};

export default FormMessage;
