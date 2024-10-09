"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import SearchPosts from "./FormSearch";
import { useState } from "react";

const ModalSearch = () => {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <Dialog onOpenChange={setOpenSearch} open={openSearch}>
      <DialogTrigger asChild>
        <Button variant="link" onClick={() => setOpenSearch(!openSearch)}>
          <Search
            className="text-primary/80 hover:text-primary duration-200"
            strokeWidth={1}
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pesquisar Conteúdo</DialogTitle>
        </DialogHeader>
        <div className=" w-[80%] m-auto">
          <SearchPosts onOpenChange={setOpenSearch} open={openSearch} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSearch;
