import Logo from "./Logo";

import SearchPosts from "./SearchPosts";
import AuthBtns from "./AuthBtns";

import UserMenu from "./UserMenu";
import UserProps from "@/src/types/user";

const Header = async ({ user }: { user: UserProps }) => {
  return (
    <nav className="flex items-center relative gap-8">
      <Logo />
      <div className="flex items-center justify-end gap-8 absolute right-0 h-full">
        <SearchPosts />
        {user ? <UserMenu user={user} /> : <AuthBtns />}
      </div>
    </nav>
  );
};

export default Header;
