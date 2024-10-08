"use client";
import { useRouter } from "next/navigation";

import axios from "axios";

//components
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

//icons
import { Trash2 } from "lucide-react";

//actions
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
      <AlertDialogTrigger>
        <div className="flex items-center gap-2 cursor-pointer px-2 py-1.5">
          <Trash2 size={16} />
          <span className="text-sm">Excluir</span>
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
