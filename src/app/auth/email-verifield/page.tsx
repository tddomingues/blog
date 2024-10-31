"use client";

import { newVerification } from "@/src/actions/auth/actions";
import { Button } from "@/src/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const EmailVerifield = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const token = searchParams.get("token");

  const handleSubmit = async () => {
    try {
      if (!token) {
        return new Error("Token não encontrado");
      }

      await newVerification(token);

      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleSubmit}>Verificar E-mail</Button>
    </div>
  );
};

export default EmailVerifield;
