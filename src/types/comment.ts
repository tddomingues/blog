import UserProps from "./user";

export default interface CommentProps {
  id: string;
  content: string;
  create_at: Date;
  fk_user_id: string;
  fk_post_id: string;
  user: Pick<UserProps, "id" | "name" | "image" | "role">;
}
