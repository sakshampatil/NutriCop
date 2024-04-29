export interface IUser {
  name: string | null;
  email: string | null;
  image: string | null;
  accessToken?: string | null;
}

export interface ITarget {
  targetProteins: number;
  targetCalories: number;
}
