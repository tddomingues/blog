"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { SquarePen } from "lucide-react";

const BtnCreatePost = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/post/create")} variant="secondary">
      <SquarePen size={18} strokeWidth={1.5} />
      <span className="text-sm font-normal">Escrever</span>
    </Button>
  );
};

export default BtnCreatePost;
