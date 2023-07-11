import {Box} from '@mui/system';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {
    Card,
    CardContent,
    createTheme,
    Grid,
    IconButton,
    MenuItem,
    Pagination,
    Paper,
    Select,
    ThemeProvider,
    Typography
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import ActiveUserContext from "../../Contexts/ActiveUserContext";
import authorities from "../../config/Authorities";
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {Item} from "../../types/models/Item.model";
import ItemService from "../../Services/ItemService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

//The home page for a logged-in admin
export default function ProfilePage() {
    const {user} = useContext(ActiveUserContext);
    const [sortBy, setSortBy] = useState<string>("name");
    const navigate = useNavigate();
    const [items, setItems] = useState<Item[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [asc, setAsc] = useState(true);
    const context = useContext(ActiveUserContext);

    // define pageSize for pagination
    const pageSize = 8;

    const sortByOptions = [
        {label: "Name", value: "name"},
        {label: "Picture URL", value: "pictureURL"},
        {label: "Description", value: "description"},
        {label: "Price", value: "price"},
    ];

    const handleOrderToggle = () => {
        setAsc((prevState) => !prevState);
        setAsc(!asc);
    };

    useEffect(() => {
        if (user) {
            ItemService.getAllItems(pageSize, currentPage, sortBy, asc)
                .then((response) => {
                    const filteredItems = response.data.filter(
                        (item) => item.user?.id === user.id
                    );
                    setItems(filteredItems);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user, currentPage, pageSize, sortBy, asc]);

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


    return (
        <ThemeProvider theme={theme}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                flexDirection={'column'}
            >
                <Grid container>
                    <Grid item md={4} lg={4}/>
                    <Grid item md={4} lg={4} p={2}>
                        <Card className={"userCard"} sx={{boxShadow: "none"}}>
                            <CardContent>
                                <h1>Welcome, {context.user!.firstName} {context.user!.lastName}</h1>
                                <Button
                                    className={"userButton"}
                                    color='secondary'
                                    variant='contained'
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
                                            navigate("/item");
                                        } else {
                                            navigate("/itemuser");
                                        }
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        fontWeight={"bold"}
                                        className={"userButtonText"}
                                    >
                                        See all Items
                                    </Typography>
                                </Button>

                                <Button
                                    className={"userButton"}
                                    color='error'
                                    variant='contained'
                                    sx={{my: 1}}
                                    onClick={context.logout}
                                >
                                    <Typography
                                        variant="body2"
                                        fontWeight={"bold"}
                                        className={"userButtonText"}
                                    >
                                        Logout
                                    </Typography>
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container>
                    <h1>Your current items:</h1>
                    <Grid container columns={{xs: 6, sm: 9, md: 12}}>
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
                                startIcon={<AddIcon/>}
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
                            <Typography sx={{fontWeight: 600}} className="typography">
                                Sort by
                            </Typography>
                            <Select
                                sx={{ml: 1}}
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
                                {asc ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}
                            </IconButton>
                        </Grid>
                        {items.map((item) => (
                            <Grid xs={6} md={3} lg={1.5} p={1} key={item.id}>
                                <Card className={"userCard"} sx={{boxShadow: "none"}}>
                                    <CardContent sx={{height: "100%", padding: 3}}>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            fontWeight={"bold"}
                                            component="div"
                                            sx={{display: "inline-block"}}
                                        >
                                            {item.name}
                                        </Typography>
                                        <br/>
                                        <img
                                            style={{
                                                verticalAlign: "middle",
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: "10px",
                                                objectFit: "cover",
                                            }}
                                            src={item.pictureURL}
                                            alt="Picture"
                                        />
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
                                            sx={{pl: "5px", pt: "5px", pb: "1px"}}
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
                                            sx={{pl: "5px", pt: "5px", pb: "1px"}}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="body1"
                                                fontWeight={"bold"}
                                                component="div"
                                            >
                                                {item.price}.-
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
                                            sx={{pl: "5px", pt: "5px", pb: "1px"}}
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
                                                <EditIcon/>
                                            </IconButton>
                                            <IconButton
                                                className={"redButton"}
                                                size="large"
                                                onClick={() => handleDelete(item.id)}
                                                sx={{
                                                    ml: 1,
                                                }}
                                            >
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid md={1}/>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}