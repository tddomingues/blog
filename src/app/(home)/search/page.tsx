"use client";

import { useSearchParams } from "next/navigation";

//components
import ListPostsSearch from "@/src/components/ListPostsSearch";

//hooks
import useGetPostsSearch from "@/src/hooks/useGetPostsSearch";

const Search = () => {
  const params = useSearchParams();

  const q = params.get("q") || "";

  const { posts } = useGetPostsSearch(q);

  return (
    <div>
      {posts && (
        <div className="mt-4">
          <ListPostsSearch posts={posts} />
        </div>
      )}
    </div>
  );
};

export default Search;
