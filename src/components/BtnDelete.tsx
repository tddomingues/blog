"use client";
import { useRouter } from "next/navigation";

//actions
import { deleteComment, deletePost } from "@/src/actions/posts/actions";

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

interface BtnDeleteProps {
  id: string; //id do post ou do comentário
  type: "post" | "comment";
}

const BtnDelete = ({ id, type }: BtnDeleteProps) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (type === "comment") {
      await deleteComment(id);
    }

    if (type === "post") {
      await deletePost(id);

      router.replace("/");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex items-center gap-2 cursor-pointer px-2 py-1.5">
          <Trash2
            size={16}
            className="text-destructive hover:text-destructive/80 duration-200"
          />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja Excluir?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(id)}
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
