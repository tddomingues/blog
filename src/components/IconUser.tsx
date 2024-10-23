import Image from "next/image";
import UserProps from "../types/user";

interface UserMenuProps {
  user: Pick<UserProps, "id" | "email" | "name" | "role" | "image">;
}

const IconUser = ({ user }: UserMenuProps) => {
  return (
    <div className="bg-chart-2 grid place-items-center rounded-full h-8 w-8 cursor-pointer relative">
      {user.image ? (
        <Image
          src={user.image}
          alt="Imagem de perfil puxada com google."
          className="rounded-full absolute"
          fill
        />
      ) : (
        <span className="font-medium text-primary-foreground text-lg">
          {user.name[0]}
        </span>
      )}
    </div>
  );
};

export default IconUser;
