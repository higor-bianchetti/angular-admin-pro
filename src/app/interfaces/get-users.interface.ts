import { User } from "../models/user.model";

export interface GetUsers {
  amount: number;
  users: User[];
}
