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
        <Button
          variant="link"
          className="p-2"
          onClick={() => setOpenSearch(!openSearch)}
        >
          <Search
            className="text-primary hover:text-primary/80 duration-200"
            strokeWidth={1.5}
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pesquisar Conteúdo</DialogTitle>
        </DialogHeader>
        <div>
          <SearchPosts onOpenChange={setOpenSearch} open={openSearch} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalSearch;
