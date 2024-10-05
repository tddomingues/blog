"use client";

import Link from "next/link";
import Image from "next/image";
import { Card } from "./ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Calendar, UserRound } from "lucide-react";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import useGetPosts from "../hooks/useGetPosts";
import { NoPost } from "./NoPost";
const ListPost = () => {
  const { posts } = useGetPosts();

  console.log(posts);

  const mostLikedPosts =
    posts && posts.sort((a, b) => b.likes.length - a.likes.length).slice(0, 5);

  const firstPost = posts && posts[0];

  return (
    <>
      {posts.length > 0 ? (
        <>
          {firstPost && (
            <div className="mb-4">
              <Card className="flex flex-col gap-4 relative">
                <div className="p-4">
                  <h1 className="text-5xl font-medium">{firstPost?.title}</h1>
                  <p className="text-2xl mt-2 line-clamp-2">
                    {firstPost?.description}
                  </p>
                </div>

                <Link href={`/post/${firstPost?.id}`}>
                  <div className="relative  w-full h-[400px] ">
                    <Image
                      alt="imagem da postagem"
                      src={firstPost?.image!}
                      fill
                      className="object-cover object-center rounded-b-xl"
                    />
                  </div>
                </Link>

                <div className="absolute bottom-4 left-4">
                  <Badge
                    variant="default"
                    className="font-normal text-base mr-2"
                  >
                    {format(firstPost?.create_at!, "d MMM, yyyy", {
                      locale: ptBR,
                    })}
                  </Badge>
                  <Badge variant="default" className="font-normal text-base">
                    Tecnologia
                  </Badge>
                </div>
              </Card>
            </div>
          )}

          <div className="flex justify-between gap-8">
            <div className="grid grid-cols-3 gap-4 h-full">
              {posts.map((post, index) => (
                <Card key={index} className="flex flex-col gap-4">
                  <div className="relative h-[200px] w-full">
                    <Image
                      alt="imagem da postagem"
                      src={post.image}
                      fill
                      className="object-cover object-center rounded-t-xl"
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
                      {format(post.create_at, "d MMM, yyyy", {
                        locale: ptBR,
                      })}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-2 px-4 mb-4">
                    <h1 className="font-medium text-xl">{post.title}</h1>
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
            </div>

            <div className="flex flex-col gap-2 w-[300px]">
              <div className="mb-4">
                <h2 className="text-2xl font-medium">Mais Curtidos</h2>
              </div>

              {mostLikedPosts &&
                mostLikedPosts.map((post, index) => (
                  <Link href={`/post/${post.id}`} key={index}>
                    <Card className="flex justify-start gap-2">
                      <div className="relative min-h-[100px] w-[100px]">
                        <Image
                          alt="imagem da postagem"
                          src={post.image}
                          fill
                          className="object-cover object-center rounded-l-xl"
                        />
                      </div>
                      <div className="flex flex-col flex-1 items-start gap-1 p-2 ">
                        <Badge
                          variant="default"
                          className="font-normal text-xs"
                        >
                          Tecnologia
                        </Badge>
                        <span className="text-xs">21 de Marco de 2012</span>
                        <h3 className="font-medium line-clamp-2">
                          {post.title}
                        </h3>
                      </div>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </>
      ) : (
        <NoPost />
      )}
    </>
  );
};

export default ListPost;
