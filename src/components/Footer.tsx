import { Linkedin } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t mt-8">
      <div className="py-4 container lg:container flex justify-between items-center gap-4">
        <div>
          <p className="text-sm">©2024 tgdomingues.</p>
        </div>
        <Link href="https://github.com/tddomingues" className="cursor-pointer">
          <Linkedin className="text-primary/80" />
        </Link>
      </div>
    </footer>
  );
};
