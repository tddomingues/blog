import LikeProps from "./like";
import UserProps from "./user";

export default interface PostProps {
  id: string;
  title: string;
  description: string;
  image: string;
  likes: LikeProps[];
  user: UserProps;
  category: string;
  create_at: Date;
  fk_user_id: string;
}
