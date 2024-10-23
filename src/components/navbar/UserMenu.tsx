"use client";

import { signOut } from "next-auth/react";

//components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

//types
import UserProps from "@/src/types/user";
import IconUser from "../IconUser";

interface UserMenuProps {
  user: Pick<
    UserProps,
    "id" | "email" | "name" | "role" | "image" | "emailVerified"
  >;
}

const UserMenu = ({ user }: UserMenuProps) => {
  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <IconUser user={user} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem className="cursor-pointer" asChild>
            <span onClick={() => signOut()}>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="font-medium text-sm">{user.name.split(" ")[0]}</span>
    </div>
  );
};

export default UserMenu;
