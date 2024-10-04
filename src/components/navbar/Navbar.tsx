import SearchPosts from "./SearchPosts";
import AuthBtns from "./AuthBtns";

import UserMenu from "./UserMenu";
import UserProps from "@/src/types/user";
import { currentUser } from "@/src/actions/getCurrentUser";
import Link from "next/link";

interface NavbarProps {
  user?: UserProps | null;
}

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href={"/"}>
          <h1 className="flex flex-col items-center">
            <span className="text-lg font-semibold">TGDOMINGUES</span>
            <span className="text-xl font-semibold">BLOG</span>
          </h1>
        </Link>
        <div className="flex items-center justify-end gap-8 relative right-0 h-full">
          <SearchPosts />
          {user ? <UserMenu user={user} /> : <AuthBtns />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
