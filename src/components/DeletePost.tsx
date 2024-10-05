"use client";

import { Button } from "@/src/components/ui/button";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";

const BtnDelete = ({ id_post }: { id_post: string }) => {
  const router = useRouter();

  const handleDelete = async (id_post: string) => {
    await axios.delete(`/api/post/delete-post/${id_post}`).then(() => {
      router.replace("/");
    });
  };
  return (
    <Button variant="destructive" onClick={() => handleDelete(id_post)}>
      Excluir
    </Button>
  );
};

export default BtnDelete;
