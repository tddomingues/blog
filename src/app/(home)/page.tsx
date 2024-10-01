import Header from "@/src/components/navbar/Navbar";
import { currentUser } from "@/src/lib/auth";

const Page = async () => {
  const user = await currentUser();

  return (
    <>
      <div className="py-4 px-16">
        <Header user={user} />
      </div>
    </>
  );
};

export default Page;
