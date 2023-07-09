import { ShoppingCart } from "./ShoppingCart.model";
import { Item } from "./Item.model";

export type CartItem = {
  id: string;
  cart: ShoppingCart;
  item: Item;
};
