"use client";

import { signIn } from "next-auth/react";

//components
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Error } from "../Error";

//icon
import { FcGoogle } from "react-icons/fc";

//hooks
import { useToast } from "@/src/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

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
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error === "CredentialsSignin") {
      toast({
        variant: "destructive",
        title: "Ocorreu um erro",
        description: "E-mail ou senha incorretos",
      });
    } else {
      router.refresh();
    }
  };
  return (
    <>
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
        <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
          {isSubmitting ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            "Entrar"
          )}
        </Button>
      </form>
      <div className="flex items-center gap-2 mt-4">
        <span className="flex-1 h-[1px] rounded-xl border bg-card shadow"></span>
        <span>ou</span>
        <span className="flex-1 h-[1px] rounded-xl border bg-card shadow"></span>
      </div>
      <Button
        variant="secondary"
        className="w-full mt-4"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
          })
        }
      >
        <FcGoogle size={20} />
      </Button>
    </>
  );
};

export default LoginForm;
