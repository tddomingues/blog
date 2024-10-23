import LikeProps from "./like";
import MessageProps from "./message";
import UserProps from "./user";

export default interface PostProps {
  id: string;
  title: string;
  description: string;
  image: string;
  likes: LikeProps[];
  messages?: MessageProps[];
  user: Pick<UserProps, "id" | "name" | "image" | "role">;
  category: string;
  create_at: Date;
  fk_user_id: string;
}
