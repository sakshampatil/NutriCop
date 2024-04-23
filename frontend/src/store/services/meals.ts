import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { IMeal } from "@/types/mealTypes";

export const mealsApi = createApi({
  reducerPath: "mealsApi",
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
    getMealsList: builder.query<any, any>({
      query: () => `meals/list`,
    }),
    createMeal: builder.mutation<any, IMeal>({
      query: (body) => ({
        url: `meals/create`,
        method: "POST",
        body: body,
      }),
    }),
    deleteMeal: builder.mutation<any, number>({
      query: (id) => ({
        url: `meals/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetMealsListQuery, useCreateMealMutation, useDeleteMealMutation } = mealsApi;
