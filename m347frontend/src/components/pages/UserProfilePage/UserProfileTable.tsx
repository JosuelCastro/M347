import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {useEffect, useState} from 'react';
import {UserProfile} from '../../../types/models/UserProfile.model';
import UserProfileService from '../../../Services/UserProfileService';
import {NavLink, useNavigate} from 'react-router-dom';
import {
    Box,
    createTheme,
    IconButton,
    MenuItem,
    Pagination,
    Paper,
    Select,
    ThemeProvider,
    Typography
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import "../../../style/userprofile.css"

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
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
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    backgroundColor: "#F3F6FB",
                }
            }
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
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    boxShadow: "none",
                    borderRadius: "10px",
                    transition: ".3s",
                }
            }
        },
        MuiPaginationItem: {
            styleOverrides: {
                root: {
                    backgroundColor: "#C9E6FC",
                }
            }
        }
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const UserProfileTable = () => {
    const [sortBy, setSortBy] = useState<string>("age");
    const navigate = useNavigate();
    const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [asc, setAsc] = useState(true);

    // define pageSize for pagination
    const pageSize = 8;

    const sortByOptions = [
        {label: 'Age', value: 'age'},
        {label: 'Address', value: 'address'},
        {label: 'Profile Picture URL', value: 'profilePictureURL'},
        {label: 'Birth Date', value: 'birthDate'},
    ];

    const handleOrderToggle = () => {
        setAsc((prevState) => !prevState);
        setAsc(!asc)
    };

    useEffect(() => {
        UserProfileService.getAllUserProfiles(pageSize, currentPage, sortBy, asc).then((data) => {
            setUserProfiles(data.data);
        });
    }, [currentPage, sortBy, asc]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value - 1);
    };

    // CRUD Functions

    const handleAdd = () => {
        navigate('../userprofileedit/');
    };

    const handleEdit = (id: string) => {
        navigate('../userprofileedit/' + id);
    };

    const handleDelete = (id: string) => {
        UserProfileService.deleteUserProfile(id);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Grid container>
                    <Grid md={10} mdOffset={1}>
                        <Grid container columns={{xs: 6, sm: 9, md: 12}}>
                            <Grid xs={3} sm={4.5} md={6} p={1}>
                                <Pagination count={1} color="primary" size="large" onChange={handlePageChange}/>
                                <Button
                                    className={"userButton greenButton"}
                                    variant='contained'
                                    onClick={handleAdd}
                                    startIcon={<AddIcon/>}
                                    size={"large"}
                                    sx={{
                                        mx: .5,
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
                                    variant='contained'
                                    sx={{
                                        mx: .5,
                                        mt: 1,
                                    }}
                                    size={"large"}
                                    startIcon={<KeyboardReturnIcon/>}
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
                            <Grid xs={3} sm={4.5} md={6} p={1}
                                  display={"flex"}
                                  justifyContent={"flex-end"}
                                  alignItems={"center"}
                            >
                                <Typography sx={{fontWeight: 600}} className="typography">
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
                                    {asc ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}
                                </IconButton>
                            </Grid>
                            {userProfiles.map((userProfile) => (
                                <Grid xs={12} md={6} lg={3} p={1} key={userProfile.id}>
                                    <Card className={"userCard"} sx={{boxShadow: "none"}}>
                                        <CardContent sx={{height: "100%", padding: 3}}>
                                            <img style={{
                                                verticalAlign: "middle",
                                                width: "50px",
                                                height: "50px",
                                                borderRadius: "10px",
                                                objectFit: "cover"
                                            }}
                                                 src={userProfile.profilePictureURL} alt="Profile Picture"/>
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                fontWeight={"bold"}
                                                component="div"
                                                sx={{display: "inline-block", ml: 1}}
                                            >
                                                User: {userProfile.user?.firstName} {userProfile.user?.lastName}
                                            </Typography>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                fontWeight={"bold"}
                                                component="div"
                                            >
                                                Age:
                                            </Typography>
                                            <Paper elevation={1} sx={{pl: "5px", pt: "5px", pb: "1px"}}>
                                                <Typography
                                                    gutterBottom
                                                    variant="body1"
                                                    fontWeight={"bold"}
                                                    component="div"
                                                >
                                                    {userProfile.age}
                                                </Typography>
                                            </Paper>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                fontWeight={"bold"}
                                                component="div"
                                            >
                                                Address:
                                            </Typography>
                                            <Paper elevation={1} sx={{pl: "5px", pt: "5px", pb: "1px"}}>
                                                <Typography
                                                    gutterBottom
                                                    variant="body1"
                                                    fontWeight={"bold"}
                                                    component="div"
                                                >
                                                    {userProfile.address}
                                                </Typography>
                                            </Paper>
                                            <Typography
                                                gutterBottom
                                                variant="body2"
                                                fontWeight={"bold"}
                                                component="div"
                                            >
                                                Birth Date:
                                            </Typography>
                                            <Paper elevation={1} sx={{pl: "5px", pt: "5px", pb: "1px"}}>
                                                <Typography
                                                    gutterBottom
                                                    variant="body1"
                                                    fontWeight={"bold"}
                                                    component="div"
                                                >
                                                    {userProfile.birthDate.toString().substring(0, 10)}
                                                </Typography>
                                            </Paper>
                                            <Box mt={1}>
                                                <IconButton
                                                    className={"blueButton"}
                                                    size='large'
                                                    onClick={() => handleEdit(userProfile.user!.id)}
                                                >
                                                    <EditIcon/>
                                                </IconButton>
                                                <IconButton
                                                    className={"redButton"}
                                                    size='large'
                                                    onClick={() => handleDelete(userProfile.user!.id)}
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
                    </Grid>
                    <Grid md={1}/>
                </Grid>
            </ThemeProvider>
        </>
    );
};
export default UserProfileTable;