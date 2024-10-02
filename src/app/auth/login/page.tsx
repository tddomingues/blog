import LoginForm from "@/src/components/authForm/LoginForm";
import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import Link from "next/link";

const Login = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <LoginForm />
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-sm text-center text-stone-600">
          Não tem uma conta?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default Login;
