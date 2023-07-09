import { useFormik } from "formik";
import { Item } from "../../../types/models/Item.model";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { number, object, string } from "yup";
import activeUserContext from "../../../Contexts/ActiveUserContext";
import { useContext } from "react";
import authorities from "../../../config/Authorities";

interface ItemProps {
  Item: Item;
  submitActionHandler: (values: Item) => void;
}

//The form used to create or edit a Item
const ItemForm = ({ Item, submitActionHandler }: ItemProps) => {
  const navigate = useNavigate();
  const context = useContext(activeUserContext);

  const formik = useFormik({
    initialValues: {
      id: Item.id,
      name: Item ? Item.name : "",
      pictureURL: Item ? Item.pictureURL : "",
      description: Item ? Item.description : "",
      price: Item ? Item.price : 0,
      user: Item
        ? Item.user
        : {
            id: "",
          },
    },
    validationSchema: object({
      name: string().required(),
      pictureURL: string().required().url(),
      description: string().required(),
      price: number().required(),
    }),
    onSubmit: (values: Item) => {
      submitActionHandler(values);
    },
    enableReinitialize: true,
  });

  return (
    <>
      <Grid container>
        <Grid item md={4} />
        <Grid item xs={12} md={4} p={1}>
          <Typography sx={{ fontWeight: 600 }} variant="h4">
            Item Form
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Card className={"userCard"}>
              <CardContent>
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>Name</Typography>
                  <TextField
                    fullWidth
                    id="name"
                    variant="outlined"
                    className="input"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.name && formik.errors.name)}
                    value={formik.values.name}
                  />
                  {formik.errors.name && formik.touched.name ? (
                    <div style={{ color: "red" }}>{formik.errors.name}</div>
                  ) : null}
                  <Typography sx={{ fontWeight: 600 }}>Picture URL</Typography>
                  <TextField
                    fullWidth
                    id="pictureURL"
                    variant="outlined"
                    className="input"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={Boolean(
                      formik.touched.pictureURL && formik.errors.pictureURL
                    )}
                    value={formik.values.pictureURL}
                  />
                  {formik.errors.pictureURL && formik.touched.pictureURL ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.pictureURL}
                    </div>
                  ) : null}
                  <Typography sx={{ fontWeight: 600 }}>Description</Typography>
                  <TextField
                    fullWidth
                    id="description"
                    className="input"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={Boolean(
                      formik.touched.description && formik.errors.description
                    )}
                    value={formik.values.description}
                  />

                  {formik.errors.description && formik.touched.description ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.description}
                    </div>
                  ) : null}
                  <Typography sx={{ fontWeight: 600 }}>Price</Typography>
                  <TextField
                    id="price"
                    className="input"
                    variant="outlined"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={Boolean(formik.touched.price && formik.errors.price)}
                    value={formik.values.price}
                  />
                  {formik.errors.price && formik.touched.price ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.price as string}
                    </div>
                  ) : null}
                </Box>
                <div>
                  <Button
                    sx={{ marginTop: "15px" }}
                    className={"userButton"}
                    variant="contained"
                    color="error"
                    onClick={() => {
                      if (
                        // @ts-ignore because the role of the user could be null but we catch that with the else here
                        context.user?.roles
                          .map((element) => element.name)
                          // @ts-ignore
                          .includes(authorities.USER_DELETE) ||
                        // @ts-ignore because the role of the user could be null but we catch that with the else here
                        context.user?.roles
                          .map((element) => element.name)
                          // @ts-ignore
                          .includes(authorities.USER_MODIFY)
                      ) {
                        navigate("/authHomeAdmin");
                      } else {
                        navigate("/authHomeUser");
                      }
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      className={"userButtonText"}
                    >
                      Cancel
                    </Typography>
                  </Button>
                  <Button
                    sx={{ marginTop: "15px", marginRight: "10px" }}
                    className={"userButton"}
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={!(formik.dirty && formik.isValid)}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      className={"userButtonText"}
                    >
                      {Item.id && "Save"}
                      {!Item.id && "Finish"}
                    </Typography>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Grid>
        <Grid item md={4} />
      </Grid>
    </>
  );
};

export default ItemForm;
