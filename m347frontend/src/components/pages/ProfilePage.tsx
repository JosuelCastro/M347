import {Box} from '@mui/system';
import Button from "@mui/material/Button";
import {NavLink, useNavigate} from "react-router-dom";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import React from "react";
import ActiveUserContext from "../../Contexts/ActiveUserContext";
import authorities from "../../config/Authorities";

//The home page for a logged-in admin
export default function ProfilePage() {

    const context = React.useContext(ActiveUserContext);
    const navigate = useNavigate();

    const handleAdd = () => {
        navigate('/itemedit/');
    };

    const handleEdit = (id: string) => {
        navigate('../itemedit/' + id);
    };

    return (
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
        </Box>
    );
}