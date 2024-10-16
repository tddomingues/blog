"use client";

import { SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createMessage } from "../actions/posts/actions";

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
      <div>
        <Input
          placeholder="Escreva seu comentário"
          className="pr-14"
          {...register("content")}
        />
      </div>
      <Button className="absolute right-0 top-0" variant="link">
        <SendHorizontal className="text-sky-500 hover:text-sky-500/80" />
      </Button>
    </form>
  );
};

export default FormMessage;
