import { User } from "./user.type";

export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  createdAt: Date;
  deletedAt: Date;
  userId: number;
  thumbnail: string;
  user: User;
}
