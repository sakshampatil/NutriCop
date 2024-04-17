import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { IRecipe } from "@/types/recipeTypes";

export const recipesApi = createApi({
  reducerPath: "recipesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // const token = (getState() as RootState).auth.token;a
      // const token = (getState() as RootState).auth?.user?.accessToken;
      const token = localStorage.getItem("token") || "";

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getRecipesList: builder.query<any, any>({
      query: ({ name, page, pageSize, sortBy, desc }) => {
        let [head]: any = sortBy;
        return `recipes/list?search=${name}&page=${page}&pageSize=${pageSize}&sortBy=${head}&desc=${desc}`;
      },
    }),
    createRecipe: builder.mutation<any, IRecipe>({
      query: (body) => ({
        url: `recipes/create`,
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

export const { useGetRecipesListQuery, useCreateRecipeMutation, useDeleteIngredientMutation } =
  recipesApi;
