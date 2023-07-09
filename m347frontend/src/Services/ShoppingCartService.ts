import api from "../config/Api";
import { ShoppingCart } from "../types/models/ShoppingCart.model";

const ShoppingCartService = {
  getShoppingCartById: async (
    shoppingCartID: string
  ): Promise<ShoppingCart> => {
    const { data } = await api.get<ShoppingCart>(
      `/shoppingcart/${shoppingCartID}`
    );
    return data;
  },

  addItemToCart: async (cartId: string, itemId: string, quantity: number) => {
    return api
      .post(`/shoppingcart/${cartId}/item`, {
        itemId: itemId,
        quantity: quantity,
      })
      .then((res) => {
        return res.data;
      });
  },

  removeItemFromCart: async (cartId: string, cartItemId: string) => {
    return api
      .delete(`shoppingcart/${cartId}/item/${cartItemId}`)
      .then((res) => {
        return res.data;
      });
  },
};

export default ShoppingCartService;
