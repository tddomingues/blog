"use server";

import { revalidateTag } from "next/cache";

interface ActionProps {
  id_post?: string;
  typePost: "create/delete" | "edit";
}

export default async function action(data: ActionProps) {
  if (data.typePost === "create/delete") {
    revalidateTag("/");
  }

  if (data.typePost === "edit") {
    revalidateTag(`/post/${data.id_post}`);
  }
}
