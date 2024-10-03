import Navbar from "@/src/components/navbar/Navbar";
import { currentUser } from "@/src/actions/getCurrentUser";
import posts from "@/src/constants/posts";
import Image from "next/image";
import { Card } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import Link from "next/link";
import { Calendar, UserRound } from "lucide-react";
import { useState } from "react";
import ModalCreatePost from "@/src/components/ModalCreatePost";
import { getPosts } from "@/src/actions/getPosts";
import PostProps from "@/src/types/post";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Page = async () => {
  const user = await currentUser();
  const postsx = await getPosts();

  const firstPost = postsx
    ? postsx[0]
    : {
        id: "1",
        title: "React",
        description:
          "React is a JavaScript library for building dynamic and interactive uReact is a JavaScript library for building dynamic and interactive userReact is a JavaScript library for building dynamic and interactive userReact is a JavaScript library for building dynamic and interactive userReact is a JavaScript library for building dynamic and interactive userReact is a JavaScript library for building dynamic and interactive userReact is a JavaScript library for building dynamic and interactive userReact is a JavaScript library for building dynamic and interactive userReact is a JavaScript library for building dynamic and interactive userser interfaces. It focuses on component-based architecture, making it easier to manage complex UIs by breaking them down into smaller, reusable parts.",
        like: 12,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png",
        reading_time: 85,
        category: "Frontend",
        create_at: "2021-06-01",
        fk_user_id: "38ed7303-1ac7-4c51-9ab9-5ac15b852b6c",
      };

  return (
    <>
      <nav className="py-4 border-b">
        <div className="container">
          <Navbar user={user} />
        </div>
      </nav>
      <div className="flex flex-col gap-4">
        <div className="flex justify-end pt-4 container">
          {user?.role === "admin" && <ModalCreatePost user={user} />}
        </div>
        <div className="container">
          <Card className="flex flex-col gap-4 relative">
            <div className="p-4">
              <h1 className="text-5xl font-medium">
                {firstPost.title} - {firstPost.id}
              </h1>
              <p className="text-2xl mt-2">{firstPost.description}</p>
            </div>

            <div className="relative  w-full h-[400px] ">
              <Image
                alt="imagem da postagem"
                src={firstPost.image}
                fill
                objectFit="cover"
              />
            </div>

            <div className="absolute bottom-4 left-4">
              <Badge variant="outline" className="font-normal text-base mr-2">
                {format(firstPost.create_at, "d MMM, yyyy", {
                  locale: ptBR,
                })}
              </Badge>
              <Badge variant="default" className="font-normal text-base">
                Tecnologia
              </Badge>
            </div>
          </Card>
        </div>
        <div className="flex gap-8 container">
          <section className="grid grid-cols-2 gap-4 h-full">
            {posts &&
              posts.map((post, index) => (
                <Card key={index} className="flex flex-col gap-4">
                  <div className="relative h-[200px] w-full">
                    <Image
                      alt="imagem da postagem"
                      src={post.image}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="px-4 mt-2">
                    <Badge
                      variant="outline"
                      className="font-normal text-base mr-2"
                    >
                      <span className="mr-2">
                        <UserRound size={18} />
                      </span>
                      Admin
                    </Badge>
                    <Badge variant="outline" className="font-normal text-base">
                      <span className="mr-2">
                        <Calendar size={18} />
                      </span>
                      {format(firstPost.create_at, "d MMM, yyyy", {
                        locale: ptBR,
                      })}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-2 px-4 mb-4">
                    <h1 className="font-medium text-xl">
                      {post.title} - {post.id} dsadsadasd dasdasd asdasdsd
                      asdasd asda
                    </h1>
                    <p className="line-clamp-2">{post.description}</p>
                    <Link
                      href={`/post/${post.id}`}
                      className="font-medium underline "
                    >
                      Ler mais
                    </Link>
                  </div>
                </Card>
              ))}
          </section>
          <aside>
            <div className="flex flex-col  gap-2 w-[300px]">
              <div className="mb-4">
                <h2 className="text-2xl font-medium">Mais Curtidos</h2>
              </div>

              {posts &&
                posts.map((post, index) => (
                  <Link href={`/post/${post.id}`} key={index}>
                    <Card className="flex  justify-start gap-2">
                      <div className="relative h-[100px] w-[160px]">
                        <Image
                          alt="imagem da postagem"
                          src={post.image}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-start gap-1 p-2 ">
                        <Badge
                          variant="default"
                          className="font-normal text-xs"
                        >
                          Tecnologia
                        </Badge>
                        <span className="text-xs">21 de Marco de 2012</span>
                        <h3 className="font-medium">
                          {post.title} - {post.id}
                        </h3>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </aside>
        </div>
      </div>
      <footer></footer>
    </>
  );
};

export default Page;
