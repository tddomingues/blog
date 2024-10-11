"use client";
import Link from "next/link";

//components
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { Button } from "../ui/button";

//icons
import { Menu } from "lucide-react";

const AuthBtns = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" className="p-2">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader className="mt-4">
            <SheetTitle>Olá! Acesse a sua conta</SheetTitle>
          </SheetHeader>
          <SheetFooter>
            <div className="flex flex-col gap-2 w-full mt-4">
              <Button variant="secondary" asChild>
                <Link href="/auth/login">Entrar</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/auth/register">Cadastrar</Link>
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AuthBtns;
