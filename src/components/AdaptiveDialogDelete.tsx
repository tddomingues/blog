//components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/src/components/ui/alert-dialog";

//icons
import { Button } from "./ui/button";

import { deleteComment, deletePost } from "../actions/posts/actions";
import { useToast } from "../hooks/use-toast";

interface AdaptiveDialogProps {
  isOpen?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
  id: string;
  type: "comment" | "post";
}

const AdaptiveDialogDelete = ({
  type,
  id,
  isOpen,
  setIsOpen,
  title,
  description,
}: AdaptiveDialogProps) => {
  const handleDelete = async (id: string) => {
    if (type === "comment") {
      const res = await deleteComment(id);

      if (res.error) {
        new Error("Ocorreu um erro ao excluir o comentário");
      }
    }

    if (type === "post") {
      const res = await deletePost(id);

      if (res.error) {
        new Error("Ocorreu um erro ao excluir o post");
      }
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => handleDelete(id)} variant="destructive">
              Excluir
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AdaptiveDialogDelete;
