import { Footer } from "@/src/components/Footer";
import Navbar from "@/src/components/navbar/Navbar";

interface PageProps {
  children: React.ReactNode;
}

const Layout = ({ children }: PageProps) => {
  return (
    <div className="flex flex-col h-svh">
      <Navbar />
      <div className="flex-1 px-2 lg:container">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
