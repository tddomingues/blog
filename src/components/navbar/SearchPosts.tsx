"use client";

import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const SearchPosts = () => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Pesquise por um título"
        className="pr-8 rounded-2xl"
      />
      <Search className="text-primary/50 absolute top-[5px] right-[5px]" />
    </div>
  );
};

export default SearchPosts;
