//components
import ListPostsSearch from "@/src/components/ListPostsSearch";
import { getSeachPost } from "@/src/actions/posts/actions";

const Search = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { q: string | undefined };
}) => {
  const posts = await getSeachPost(searchParams?.q || "");

  return (
    <div>
      <div className="mt-4 container">
        {posts && (
          <ListPostsSearch posts={posts} query={searchParams?.q || ""} />
        )}
      </div>
    </div>
  );
};

export default Search;
