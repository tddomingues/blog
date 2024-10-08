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
    <div>
      <div className="border-b p-2">
        <div className="container flex items-center justify-between">
          <Link href={"/"}>
            <h1 className="flex flex-col items-center">
              <span className="text-base font-extrabold lg:text-lg">
                TGDOMINGUES
              </span>
              <span className="text-lg font-extrabold lg:text-xl">BLOG</span>
            </h1>
          </Link>
          <div className="flex items-center flex-col justify-end gap-8 relative right-0 h-full">
            {user ? <UserMenu user={user} /> : <AuthBtns />}
          </div>
        </div>
      </div>
      {/* <div className="mt-4 px-2 lg:container lg:w-[60%]">
        <SearchPosts />
      </div> */}
    </div>
  );
};

export default Navbar;
