import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import RegisterForm from "@/src/components/authForm/RegisterForm";

const Register = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Cadastrar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-sm text-center text-stone-600">
          Já tem uma conta?{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Entrar
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Register;
