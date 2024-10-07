"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";

import { signOut } from "next-auth/react";
import UserProps from "@/src/types/user";

const UserMenu = ({ user }: { user: UserProps }) => {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="bg-chart-2 grid place-items-center rounded-full h-10 w-10 cursor-pointer">
            <span className="font-medium text-primary-foreground text-lg">
              {user.name![0]}
            </span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem className="cursor-pointer" asChild>
            <span onClick={() => signOut()}>Sair</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className="font-medium">{user.name}</span>
    </div>
  );
};

export default UserMenu;
