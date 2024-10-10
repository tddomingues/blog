"use client";
import { useRouter } from "next/navigation";

import axios from "axios";

//icons
import { LoaderCircle } from "lucide-react";

//components
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Error } from "../Error";

//hooks
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useToast } from "@/src/hooks/use-toast";

const schema = z
  .object({
    email: z.string().email(),
    name: z.string().min(5),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

type FormFields = z.infer<typeof schema>;

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    axios
      .post("/api/auth/register", data)
      .then(() => {
        router.push("/auth/login");
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Ocorreu um erro",
          description: err.response.data.error,
        });

        return err;
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div>
          <Label className="text-right">Nome</Label>
          <Input type="text" {...register("name")} />
          {errors.name && <Error message="Nome muito curto" />}
        </div>
        <div>
          <Label className="text-right">E-mail</Label>
          <Input type="text" {...register("email")} />
          {errors.email && <Error message="E-mail inválido" />}
        </div>
        <div>
          <Label className="text-right">Senha</Label>
          <Input type="password" {...register("password")} />
          {errors.password && <Error message="Senha muito curta" />}
        </div>
        <div>
          <Label className="text-right">Confirmar Senha</Label>
          <Input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <Error
              message={
                errors.confirmPassword.type === "min"
                  ? "Senha muito curta"
                  : "Senhas não coincidem"
              }
            />
          )}
        </div>
      </div>
      <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
        {isSubmitting ? (
          <LoaderCircle className="animate-spin" size={20} />
        ) : (
          "Cadastrar"
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
