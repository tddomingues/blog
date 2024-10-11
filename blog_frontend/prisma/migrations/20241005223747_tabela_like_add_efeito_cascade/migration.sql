-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_fk_post_id_fkey";

-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_fk_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_fk_post_id_fkey" FOREIGN KEY ("fk_post_id") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
