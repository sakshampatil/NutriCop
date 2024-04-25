import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { IMeal } from "@/types/mealTypes";
import { ITarget } from "@/types/dayTypes";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth.token;
      // const token = (getState() as RootState).auth?.user?.accessToken;
      const token = localStorage.getItem("token") || "";

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query<any, any>({
      query: () => `auth/getUser`,
    }),
    updatetarget: builder.mutation<any, ITarget>({
      query: (body) => ({
        url: `auth/updateTarget`,
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdatetargetMutation } = authApi;
