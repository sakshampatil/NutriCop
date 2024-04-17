export interface IRecipe {
  name: string;
  ingredients: { id: number; qty: number }[];
  calories: number;
  proteins: number;
}
