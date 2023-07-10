import { useNavigate, useParams } from "react-router-dom";
import ItemService from "../../../Services/ItemService";
import { useContext, useEffect, useState } from "react";
import { Item } from "../../../types/models/Item.model";
import ItemForm from "../../molecules/ItemForm/ItemForm";
import ActiveUserContext from "../../../Contexts/ActiveUserContext";
import authorities from "../../../config/Authorities";
import roles from "../../../config/Roles";

const ItemPage = () => {
  const context = useContext(ActiveUserContext);
  const navigate = useNavigate();
  const { ItemId } = useParams();
  const [Item, setItem] = useState<Item>({
    id: "",
    name: "",
    pictureURL: "",
    description: "",
    price: 0,
    user: {
      id: "",
    },
  });

  useEffect(() => {
    return () => {
      if (ItemId) {
        ItemService.getItem(ItemId).then((res) => {
          return setItem(res);
        });
      }
    };
  }, [ItemId]);

  const submitActionHandler = (values: Item) => {
    const Item: Item = {
      id: values.id,
      name: values.name,
      pictureURL: values.pictureURL,
      description: values.description,
      price: values.price,
      user: {
        id: context.user!.id,
      },
    };

    if (ItemId !== undefined) {
      ItemService.updateItem(Item.id, Item).then(() => {
        if (
          // @ts-ignore because the role of the user could be null but we catch that with the else here
          context.user.roles
            .map((element) => element.name)
            // @ts-ignore
            .includes(authorities.USER_DELETE) ||
          // @ts-ignore because the role of the user could be null but we catch that with the else here
          context.user.roles
            .map((element) => element.name)
            // @ts-ignore
            .includes(authorities.USER_MODIFY)
        ) {
          navigate("/profile");
        } else {
          navigate("/profile");
        }
      });
    } else {
      ItemService.addItem(Item).then(() => {
        if (
          // @ts-ignore because the role of the user could be null but we catch that with the else here
          context.user.roles
            .map((element) => element.name)
            // @ts-ignore
            .includes(authorities.USER_DELETE) ||
          // @ts-ignore because the role of the user could be null but we catch that with the else here
          context.user.roles
            .map((element) => element.name)
            // @ts-ignore
            .includes(authorities.USER_MODIFY)
        ) {
          navigate("/profile");
        } else {
          navigate("/profile");
        }
      });
    }
  };
  return <ItemForm Item={Item} submitActionHandler={submitActionHandler} />;
};
export default ItemPage;
