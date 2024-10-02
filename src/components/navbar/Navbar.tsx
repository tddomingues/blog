import Logo from "./Logo";

import SearchPosts from "./SearchPosts";
import AuthBtns from "./AuthBtns";

import UserMenu from "./UserMenu";
import UserProps from "@/src/types/user";

interface NavbarProps {
  user?: UserProps | null;
}

const Navbar = async ({ user }: NavbarProps) => {
  return (
    <div className="flex items-center relative gap-8">
      <Logo />
      <div className="flex items-center justify-end gap-8 absolute right-0 h-full">
        <SearchPosts />
        {user ? <UserMenu user={user} /> : <AuthBtns />}
      </div>
    </div>
  );
};

export default Navbar;
