import LikeProps from "./like";

export default interface PostProps {
  id: string;
  title: string;
  description: string;
  image: string;
  likes: LikeProps[];
  reading_time: number;
  category: string;
  create_at: Date;
  fk_user_id: string;
}
