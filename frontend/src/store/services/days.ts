import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const daysApi = createApi({
  reducerPath: "daysApi",
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
    getDaysList: builder.query<any, void>({
      query: () => `days/list`,
    }),
    getDay: builder.query<any, void>({
      query: () => `days/day`,
    }),
  }),
});

export const { useGetDaysListQuery, useGetDayQuery } = daysApi;
