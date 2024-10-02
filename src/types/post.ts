export default interface PostProps {
  id?: string;
  title: string;
  description: string;
  favorite: number;
  image: string;
  reading_time: number;
  category: string;
  create_at: string;
  fk_user_id: string;
}
