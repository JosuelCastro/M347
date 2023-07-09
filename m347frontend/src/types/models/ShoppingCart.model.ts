import { User } from "./User.model";
import { CartItem } from "./CartItem.model";

export type ShoppingCart = {
  cartitem?: CartItem;
  user?: User;
};
