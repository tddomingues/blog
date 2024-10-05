import { currentUser } from "@/src/actions/getCurrentUser";
import _posts from "@/src/constants/posts";

import Link from "next/link";

import ListPost from "@/src/components/ListPosts";

export const Page = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end mt-4 container">
        {user?.role === "admin" && (
          <Link
            href={"/post/create"}
            className="
            h-9 px-4 py-2 
            rounded-md 
            text-sm font-medium transition-colors 
            focus-visible:outline-none 
            focus-visible:ring-1 focus-visible:ring-ring 
            disabled:pointer-events-none disabled:opacity-50 
            bg-primary text-primary-foreground shadow hover:bg-primary/90"
          >
            Criar postagem
          </Link>
        )}
      </div>
      <div className="container">
        <ListPost />
      </div>
    </div>
  );
};

export default Page;
