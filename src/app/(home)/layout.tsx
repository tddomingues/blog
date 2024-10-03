import { Footer } from "@/src/components/Footer";
import Navbar from "@/src/components/navbar/Navbar";

interface PageProps {
  children: React.ReactNode;
}

const Layout = ({ children }: PageProps) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
