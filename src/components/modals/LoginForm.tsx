"use client";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, SubmitHandler } from "react-hook-form";

import Error from "../Error";
import { useToast } from "@/src/hooks/use-toast";

import { login } from "@/src/actions/login";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

type FormFields = z.infer<typeof schema>;

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const res = await login(data);

      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Ocorreu um erro",
          description: res.error,
        });
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
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
      </div>
      <Button type="submit" className="w-full mt-8" disabled={isSubmitting}>
        {isSubmitting ? (
          <LoaderCircle className="animate-spin" size={20} />
        ) : (
          "Entrar"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
