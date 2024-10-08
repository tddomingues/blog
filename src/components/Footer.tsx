import { Github, Mail } from "lucide-react";
import { Badge } from "./ui/badge";

export const Footer = () => {
  return (
    <footer className="border-t mt-4">
      <div className="p-4  lg:container">
        <div className="flex justify-between">
          <div className="w-60">
            <h4 className="font-bold">Sobre</h4>
            <p className="text-primary/80 text-sm">
              O site é meramente ilustrativo. Apenas para fins didáticos.{" "}
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="text-primary/80" />
              <span className="text-sm text-primary/80">
                tiago3d2s3@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="text-primary/80" />
              <span className="text-sm text-primary/80">Meu GitHub</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
