import { currentUser } from "@/src/actions/getCurrentUser";
import _posts from "@/src/constants/posts";
import Image from "next/image";
import { Card } from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import Link from "next/link";
import { Calendar, UserRound } from "lucide-react";
import ModalCreatePost from "@/src/components/CreatePost";
import { getPosts } from "@/src/actions/getAllPosts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import useGetPosts from "@/src/hooks/useGetPosts";
import ListPost from "@/src/components/ListPosts";

export const NoPost = () => {
  return (
    <div className="container">
      <h2 className="text-5xl font-medium text-center">SEM CONTEÚDO</h2>
    </div>
  );
};

export const Page = async () => {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end mt-4 container">
        {user?.role === "admin" && <ModalCreatePost user={user} />}
      </div>
      <div className="container">
        <ListPost />
      </div>
    </div>
  );
};

export default Page;
