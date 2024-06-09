import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_APP_BACKEND_URL || "http://localhost:3000",
    mode: "cors",
    prepareHeaders: async (headers, { getState }) => {
      // cheching mechanism
      if (findValueInObject(getState())?.status == "fulfilled") {
        const { user, token } = findValueInObject(getState())?.data;
        const accessToken = token?.access_token;

        headers.set("Authorization", `Bearer ${accessToken}`);
        headers.set("Accept", "application/json");
        return headers;
      }

      // regular mechanism if the above finds no data
      try {
        const { user, token } = (await getSession()) ?? {};
        const accessToken = token?.access_token;

        headers.set("Authorization", `Bearer ${accessToken}`);
        headers.set("Accept", "application/json");
      } catch (error) {
        // console.log(error);
      }

      return headers;
    },
  }),
  // tagTypes: ["getUser", "getAllVariants"],
  endpoints: (builder) => ({}),
});

function findValueInObject(obj, key = "getUser(undefined)") {
  for (const k in obj) {
    if (k === key) {
      return obj[k];
    } else if (typeof obj[k] === "object") {
      const value = findValueInObject(obj[k], key);
      if (value) {
        return value;
      }
    }
  }
}
