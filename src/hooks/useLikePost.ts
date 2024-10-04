import axios from "axios";

import { useEffect, useMemo, useState } from "react";

export default function useLikePost(
  id_user: string,
  id_post: string,
  dynamicLike: boolean
) {
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const fetchPostData = async () => {
      if (!id_user || !id_post) return;

      try {
        const response = await axios.get(`/api/post/get/${id_post}`);
        const post = response.data;

        if (isMounted && post?.id_user_like.includes(id_user)) {
          setHasLiked(true);
        } else {
          setHasLiked(false);
        }
      } catch (error) {
        console.error(
          "Erro ao verificar se o usuário curtiu a postagem:",
          error
        );
      }
    };

    fetchPostData();

    return () => {
      isMounted = false;
    };
  }, [id_post, id_user, dynamicLike]);

  return { hasLiked };
}
