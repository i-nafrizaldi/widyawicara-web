import { Product } from "./product.type";

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  gender: Gender;
  createdAt: Date;
  product: Product[];
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}
