"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";

import axios from "axios";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import action from "../actions/actions";

const BtnDelete = ({ id_post }: { id_post: string }) => {
  const router = useRouter();

  const handleDelete = async (id_post: string) => {
    await axios.delete(`/api/post/delete-post/${id_post}`);

    await action({ typePost: "create/delete" });

    router.replace("/");
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer transition-colors duration-200 hover:text-destructive">
          <Trash2 />
          Excluir
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja Excluir a Postagem?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(id_post)}
            className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BtnDelete;
