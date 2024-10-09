"use client";

import { useRouter } from "next/navigation";

//components
import { Button } from "./ui/button";
import { Input } from "./ui/input";

//hooks
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

//icons
import { Search } from "lucide-react";

const schema = z.object({
  search: z.string().min(1),
});

type FormFields = z.infer<typeof schema>;

interface SearchPostsProps {
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

const FormSearch = ({ onOpenChange, open }: SearchPostsProps) => {
  const router = useRouter();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      search: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async ({ search }) => {
    if (typeof search !== "string") return;

    const uncodedQuery = encodeURI(search);

    onOpenChange(!open);

    router.replace(`/search?q=${uncodedQuery}`);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Pesquise por um título"
          className="pr-8 rounded-2xl"
          {...register("search")}
        />
        <Button variant="link" type="submit" className="absolute top-0 right-0">
          <Search className="text-primary/50" />
        </Button>
      </form>
    </div>
  );
};

export default FormSearch;
