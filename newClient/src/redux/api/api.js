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

    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `/chat/${chatId}`;
        if (populate) {
          url += "?populate=true";
        }
        return {
          url,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `/chat/messages/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    sendAttachment: builder.mutation({
      query: (data) => ({
        url: "/chat/messages",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    myGroups: builder.query({
      query: () => ({
        url: "/chat/myGroups",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    availableFriends: builder.query({
      query: (chatId) => {
        let url = `/user/friends`;
        if (chatId) {
          url += `?chatId=${chatId}`;
        }
        return {
          url,
          method: "GET",
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    newGroup: builder.mutation({
      query: ({ groupName, members }) => ({
        url: "/chat/newGroup",
        method: "POST",
        credentials: "include",
        body: { groupName, members },
      }),
      invalidatesTags: ["Chat"],
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

  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentMutation,
  useMyGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,

} = api;
