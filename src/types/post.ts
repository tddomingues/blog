import LikeProps from "./like";

export default interface PostProps {
  id: string;
  title: string;
  description: string;
  image: string;
  likes: LikeProps[];
  reading_time: number;
  id_user_like: string[];
  category: string;
  create_at: string;
  fk_user_id: string;
}
