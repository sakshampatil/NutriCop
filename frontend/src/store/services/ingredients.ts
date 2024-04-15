import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { IIngredient } from "@/types/ingredientTypes";

export const ingredientsApi = createApi({
  reducerPath: "ingredientsApi",
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
    getIngredientsList: builder.query<any, any>({
      query: ({ name, page, pageSize, sortBy, desc }) => {
        let [head]: any = sortBy;
        return `ingredients/list?search=${name}&page=${page}&pageSize=${pageSize}&sortBy=${head}&desc=${desc}`;
      },
    }),
    createIngredient: builder.mutation<any, IIngredient>({
      query: (body) => ({
        url: `ingredients/create`,
        method: "POST",
        body: body,
      }),
    }),
    deleteIngredient: builder.mutation<any, number>({
      query: (id) => ({
        url: `ingredients/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetIngredientsListQuery,
  useCreateIngredientMutation,
  useDeleteIngredientMutation,
} = ingredientsApi;
