"use server";

import axios from "axios";

export const getSeachPost = async (search: string) => {
  const res = await axios.get(`/api/post/search?q=${search}`);

  return res.data;
};
