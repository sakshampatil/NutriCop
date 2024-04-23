export interface IMeal {
  mealNo: number;
  recipes?: { id: number; name: string; qty: number }[];
  proteins: number;
  calories: number;
  time: string;
}
