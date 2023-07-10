import api from "../config/Api";
import { AxiosResponse } from "axios";
import { Item } from "../types/models/Item.model";

const ItemService = {
  getItem: async (itemID: string): Promise<Item> => {
    const { data } = await api.get<Item>(`/item/${itemID}`);
    return data;
  },

  updateItem: (id: string, item: Item) => {
    return api.put(`/item/${id}`, item);
  },

  addItem: (item: Item) => {
    return api.post("/item", item).then((res) => {
      return res.data;
    });
  },

  getAllItems: (
    pageSize: number,
    page: number,
    sortBy: string,
    asc: boolean
  ): Promise<AxiosResponse<Item[]>> => {
    return api.get<Item[]>("/item", {
      params: {
        pageSize: pageSize,
        page: page,
        sortBy: sortBy,
        asc: asc,
      },
    });
  },

  deleteItem: (id: string) => {
    return api.delete(`/item/${id}`);
  },
  getItemsByUserId: (userId: string): Promise<AxiosResponse<Item[]>> => {
    return api.get<Item[]>(`/item/user/${userId}`);
  },
};

export default ItemService;
