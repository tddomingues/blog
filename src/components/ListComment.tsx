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
import AdaptiveDialog from "./AdaptiveDialogDelete";

import FormEditComment from "./FormEditComment";

interface ListCommentProps {
  messages: MessageProps[];
  id_post: string;
  user: Pick<UserProps, "id" | "image" | "email" | "role" | "name"> | null;
}

const ListComment = ({ messages, user, id_post }: ListCommentProps) => {
  const [idComment, setIdComment] = useState("");

  const [isEditOpen, setIsEditOpen] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleEditComment = (id: string) => {
    setIsEditOpen(true);
  };

  return (
    <>
      <AdaptiveDialog
        isOpen={openDialog}
        setIsOpen={setOpenDialog}
        title="Excluir Comentário"
        description="Excluir seu comentário permanentemente?"
        id={idComment}
        type="comment"
      />

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
            <FormEditComment
              idComment={idComment}
              id_post={id_post}
              setIsEditOpen={setIsEditOpen}
            />
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
