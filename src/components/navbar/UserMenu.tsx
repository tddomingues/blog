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

const UserMenu = ({ user }: { user: UserProps }) => {
  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="bg-chart-2 grid place-items-center rounded-full h-8 w-8 cursor-pointer">
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
      <span className="font-medium text-sm">{user.name?.split(" ")[0]}</span>
    </div>
  );
};

export default UserMenu;
