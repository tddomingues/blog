"use client";

import { useState } from "react";

//components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import SearchPosts from "./FormSearch";
import { Button } from "./ui/button";

//icons
import { Search } from "lucide-react";

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
