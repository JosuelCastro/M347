import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { Item } from "../../../types/models/Item.model";
import ItemService from "../../../Services/ItemService";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Box,
  createTheme,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import "../../../style/userprofile.css";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const theme = createTheme({
  typography: {
    fontFamily: "Product Sans",
    fontWeightRegular: 500,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#e7eeff",
          color: "#071C33",
          borderRadius: "10px",
          boxShadow: "none",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          backgroundColor: "#F3F6FB",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        select: {
          backgroundColor: "#F3F6FB",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "10px",
          transition: ".3s",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderRadius: "10px",
          transition: ".3s",
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          backgroundColor: "#C9E6FC",
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const ItemTable = () => {
  const [sortBy, setSortBy] = useState<string>("name");
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [asc, setAsc] = useState(true);

  // define pageSize for pagination
  const pageSize = 8;

  const sortByOptions = [
    { label: "Name", value: "name" },
    { label: "Picture URL", value: "pictureURL" },
    { label: "Description", value: "description" },
    { label: "Price", value: "price" },
  ];

  const handleOrderToggle = () => {
    setAsc((prevState) => !prevState);
    setAsc(!asc);
  };

  useEffect(() => {
    ItemService.getAllItems(pageSize, currentPage, sortBy, asc).then((data) => {
      setItems(data.data);
    });
  }, [currentPage, sortBy, asc]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value - 1);
  };

  // CRUD Functions

  const handleAdd = () => {
    navigate("../itemedit/");
  };

  const handleEdit = (id: string) => {
    navigate("../itemedit/" + id);
  };

  const handleDelete = (id: string) => {
    ItemService.deleteItem(id).then(() => {
      remove(items, id);
    });
  };

  function remove(removeItems: Item[], itemId: string) {
    const result = removeItems.filter((item) => item.id !== itemId);
    setItems(result);
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid md={10} mdOffset={1}>
            <Grid container columns={{ xs: 6, sm: 9, md: 12 }}>
              <Grid xs={3} sm={4.5} md={6} p={1}>
                <Pagination
                  count={1}
                  color="primary"
                  size="large"
                  onChange={handlePageChange}
                />
                <Button
                  className={"userButton greenButton"}
                  variant="contained"
                  onClick={handleAdd}
                  startIcon={<AddIcon />}
                  size={"large"}
                  sx={{
                    mx: 0.5,
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={"bold"}
                    className={"userButtonText"}
                  >
                    Add
                  </Typography>
                </Button>
                <Button
                  className={"redButton"}
                  variant="contained"
                  sx={{
                    mx: 0.5,
                    mt: 1,
                  }}
                  size={"large"}
                  startIcon={<KeyboardReturnIcon />}
                >
                  <NavLink to={"/authHomeAdmin"} className={"userButtonText"}>
                    <Typography
                      variant="body2"
                      fontWeight={"bold"}
                      className={"userButtonText"}
                    >
                      Back
                    </Typography>
                  </NavLink>
                </Button>
              </Grid>
              <Grid
                xs={3}
                sm={4.5}
                md={6}
                p={1}
                display={"flex"}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <Typography sx={{ fontWeight: 600 }} className="typography">
                  Sort by
                </Typography>
                <Select
                  sx={{ ml: 1 }}
                  name={"sortBy"}
                  value={sortBy}
                  label={"Sort By"}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {sortByOptions.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
                <IconButton onClick={handleOrderToggle}>
                  {asc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                </IconButton>
              </Grid>
              {items.map((item) => (
                <Grid xs={12} md={6} lg={3} p={1} key={item.id}>
                  <Card className={"userCard"} sx={{ boxShadow: "none" }}>
                    <CardContent sx={{ height: "100%", padding: 3 }}>
                      <img
                        style={{
                          verticalAlign: "middle",
                          width: "50px",
                          height: "50px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                        src={item.pictureURL}
                        alt="Picture"
                      />
                      <Typography
                        gutterBottom
                        variant="h5"
                        fontWeight={"bold"}
                        component="div"
                        sx={{ display: "inline-block", ml: 1 }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        fontWeight={"bold"}
                        component="div"
                      >
                        Description:
                      </Typography>
                      <Paper
                        elevation={1}
                        sx={{ pl: "5px", pt: "5px", pb: "1px" }}
                      >
                        <Typography
                          gutterBottom
                          variant="body1"
                          fontWeight={"bold"}
                          component="div"
                        >
                          {item.description}
                        </Typography>
                      </Paper>
                      <Typography
                        gutterBottom
                        variant="body2"
                        fontWeight={"bold"}
                        component="div"
                      >
                        Price:
                      </Typography>
                      <Paper
                        elevation={1}
                        sx={{ pl: "5px", pt: "5px", pb: "1px" }}
                      >
                        <Typography
                          gutterBottom
                          variant="body1"
                          fontWeight={"bold"}
                          component="div"
                        >
                          {item.price}
                        </Typography>
                      </Paper>
                      <Typography
                        gutterBottom
                        variant="body2"
                        fontWeight={"bold"}
                        component="div"
                      >
                        Seller:
                      </Typography>
                      <Paper
                        elevation={1}
                        sx={{ pl: "5px", pt: "5px", pb: "1px" }}
                      >
                        <Typography
                          gutterBottom
                          variant="body1"
                          fontWeight={"bold"}
                          component="div"
                        >
                          {item.user?.firstName} {item.user?.lastName}
                        </Typography>
                      </Paper>
                      <Box mt={1}>
                        <IconButton
                          className={"blueButton"}
                          size="large"
                          onClick={() => handleEdit(item.id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          className={"redButton"}
                          size="large"
                          onClick={() => handleDelete(item.id)}
                          sx={{
                            ml: 1,
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid md={1} />
        </Grid>
      </ThemeProvider>
    </>
  );
};
export default ItemTable;
