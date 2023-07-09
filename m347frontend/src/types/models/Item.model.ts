import { User } from "./User.model";

export type Item = {
  id: string;
  name: string;
  pictureURL: string;
  description: string;
  price: number;
  user: User;
};
