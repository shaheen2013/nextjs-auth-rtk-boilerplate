import { apiSlice } from "@/features/apiSlice/apiSlice";

export const authSlice = apiSlice
  .enhanceEndpoints({ addTagTypes: ["getUser"] })
  .injectEndpoints({
    reducerPath: "auth",
    overrideExisting: true,

    endpoints: (builders) => ({
      getUser: builders.query({
        query: () => {
          return {
            url: `/api/auth/session`,
            method: "GET",
          };
        },

        providesTags: ["getUser"],
      }),
    }),
  });

export const { useGetUserQuery } = authSlice;
