import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Server } from "../../constant/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${Server}`,
  }),
  tagTypes: ["Chat", "searchUser"],
  endpoints: (builder) => ({
    myChat: builder.query({
      query: () => ({
        url: "/chat/myChats",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search-user?name=${name}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["searchUser"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/send-friend-request",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      providesTags: (result, error, arg) => {
        if (result) {
          return [{ type: "searchUser", id: arg.id }];
        }
        return [];
      },
    }),
    getNotification: builder.query({
      query: () => ({
        url: "/user/notifications",
        method: "GET",
        credentials: "include",
      }),
      keepUnusedDataFor: 0, // Optional: to refetch notifications immediately
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/accept-request",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      providesTags: ["Chat"],
    }),
  }),
});

export default api;

export const {
  useMyChatQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationQuery,
  useAcceptFriendRequestMutation,
} = api;
