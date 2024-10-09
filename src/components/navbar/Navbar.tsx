import AuthBtns from "./AuthBtns";

import UserMenu from "./UserMenu";
import UserProps from "@/src/types/user";
import { currentUser } from "@/src/actions/getCurrentUser";
import Link from "next/link";

import ModalSearch from "../ModalSearch";

interface NavbarProps {
  user?: UserProps | null;
}

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="border-b py-2">
      <div className="container lg:container flex items-center justify-between">
        <Link href={"/"}>
          <h1 className="flex flex-col items-center">
            <span className="text-lg font-extrabold lg:text-xl"> TGBLOG</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <ModalSearch />

          <div className="flex items-center flex-col justify-end gap-8 relative right-0 h-full">
            {user ? <UserMenu user={user} /> : <AuthBtns />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
