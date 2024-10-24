import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import MessageProps from "../types/message";
import BtnDelete from "./BtnDelete";
import UserProps from "../types/user";

interface ListMessagesProps {
  messages: MessageProps[];
  user: Pick<UserProps, "id" | "image" | "email" | "role" | "name"> | null;
}

const ListMessages = ({ messages, user }: ListMessagesProps) => {
  return (
    <>
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
              <BtnDelete id={message.id} type="comment" />
            )}
          </div>
          <div className="mt-1">
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListMessages;
