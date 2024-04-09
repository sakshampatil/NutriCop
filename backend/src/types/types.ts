import { Request } from "express";
export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IGetUserAuthInfoRequest extends Request {
  user?: string; // or any other type
}
