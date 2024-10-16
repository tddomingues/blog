/*
id String @id @default(uuid())

  content String

  create_at DateTime @default(now())
  updatedAt DateTime @updatedAt

  fk_user_id String
  user       User   @relation(fields: [fk_user_id], references: [id], onDelete: Cascade)

  fk_post_id String
  post       Post   @relation(fields: [fk_post_id], references: [id], onDelete: Cascade)
*/

import PostProps from "./post";
import UserProps from "./user";

export default interface MessageProps {
  id: string;
  content: string;
  create_at: Date;
  fk_user_id: string;
  fk_post_id: string;
  user: Pick<UserProps, "id" | "name" | "image" | "role">;
}
