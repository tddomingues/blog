import Link from "next/link";

//actions
import { currentUser } from "@/src/actions/getCurrentUser";

//components
import AuthBtns from "./AuthBtns";
import UserMenu from "./UserMenu";
import ModalSearch from "../ModalSearch";

const Navbar = async () => {
  const user = await currentUser();
  return (
    <div className="border-b py-4">
      <div className="container lg:container flex items-center justify-between">
        <Link href={"/"}>
          <h1 className="flex flex-col items-center">
            <span className="text-lg font-extrabold lg:text-xl"> TGBLOG</span>
          </h1>
        </Link>

        <div className="flex items-center gap-1">
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
