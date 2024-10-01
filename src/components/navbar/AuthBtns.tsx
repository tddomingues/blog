"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AuthBtns = () => {
  return (
    <div className="flex justify-end gap-4 items-center">
      <Button variant="default" asChild>
        <Link href="/auth/login">Entrar</Link>
      </Button>
      <Button variant="secondary" asChild>
        <Link href="/auth/register">Cadastrar</Link>
      </Button>
    </div>
  );
};

export default AuthBtns;
