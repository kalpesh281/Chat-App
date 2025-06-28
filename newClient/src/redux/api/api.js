import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Server } from "../../constant/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Server}`,
  }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    myChat: builder.query({
      query: () => ({
        url: "/chat/myChats",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat", "searchUser"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search-user?name=${name}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["searchUser"],
    }),
  }),
});

export default api;

export const { useMyChatQuery, useLazySearchUserQuery } = api;
