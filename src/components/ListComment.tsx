"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import MessageProps from "../types/comment";
import UserProps from "../types/user";
import { Button } from "./ui/button";
import { useState } from "react";
import { Textarea } from "./ui/textarea";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import { deleteComment, editComment } from "../actions/posts/actions";
import AdaptiveDialog from "./AdaptiveDialog";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ListCommentProps {
  messages: MessageProps[];
  id_post: string;
  user: Pick<UserProps, "id" | "image" | "email" | "role" | "name"> | null;
}

const schema = z.object({
  content: z.string().nonempty(),
});

type FormFields = z.infer<typeof schema>;

const ListComment = ({ messages, user, id_post }: ListCommentProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(schema),
  });

  const [idComment, setIdComment] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const newData = {
      ...data,
      id_message: idComment,
      id_post: id_post,
    };

    await editComment(newData);

    setIsEditOpen(false);
  };

  const handleEditComment = (id: string) => {
    setIsEditOpen(true);
  };

  const handleDeleteComment = (id: string) => {
    deleteComment(id);
    setOpenDialog(false);
  };

  return (
    <>
      <AdaptiveDialog
        isOpen={openDialog}
        setIsOpen={setOpenDialog}
        title="Excluir Comentário"
        description="Excluir seu comentário permanentemente?"
      >
        <Button
          onClick={() => handleDeleteComment(idComment)}
          variant="destructive"
        >
          Excluir
        </Button>
      </AdaptiveDialog>

      {messages.map((message) => (
        <div className="mt-4" key={message.id}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-chart-2 grid place-items-center rounded-full h-8 w-8 cursor-pointer">
                <span className="font-medium text-primary-foreground text-lg">
                  {message.user.name[0].toUpperCase()}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm">{message.user.name}</span>
                <span className="text-xs text-primary/80 flex gap-1">
                  {format(message.create_at, "dd/MM/yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </span>
              </div>
            </div>
            {message.fk_user_id === user?.id && (
              <div>
                <DropdownMenu
                  open={message.id === idComment && openDropdown}
                  onOpenChange={() => {
                    if (message.id === idComment && openDropdown) {
                      setOpenDropdown(false);
                      setIdComment("");
                    } else {
                      setOpenDropdown(true);
                      setIdComment(message.id);
                    }
                  }}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost">
                      <EllipsisVertical />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <div>
                      <DropdownMenuItem>
                        <Button
                          onClick={() => {
                            handleEditComment(message.id);
                            setOpenDropdown(false);
                          }}
                          variant="ghost"
                        >
                          <Pencil />
                          <span className="ml-2">Editar</span>
                        </Button>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setOpenDropdown(false);
                            setOpenDialog(true);
                          }}
                        >
                          <Trash2 size={16} />
                          <span className="ml-2">Excluir</span>
                        </Button>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          {isEditOpen && idComment === message.id ? (
            <form className="mt-1" onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                placeholder="Atualize seu comentário..."
                {...register("content")}
              />
              <div className="flex justify-end mt-2 gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="default">
                  Salvar
                </Button>
              </div>
            </form>
          ) : (
            <div className="mt-1">
              <p className="text-sm">{message.content}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ListComment;
