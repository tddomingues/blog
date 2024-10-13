/*
  Warnings:

  - You are about to drop the column `id_user_like` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `like` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "id_user_like",
DROP COLUMN "like";

-- CreateTable
CREATE TABLE "Like" (
    "id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fk_user_id" TEXT NOT NULL,
    "fk_post_id" TEXT NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_fk_post_id_fkey" FOREIGN KEY ("fk_post_id") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
