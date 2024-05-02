export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/ingredients",
    "/ingredients/addIngredients",
    "/recipes",
    "/recipes/addRecipes",
    "/meals",
    "/days",
  ],
};
