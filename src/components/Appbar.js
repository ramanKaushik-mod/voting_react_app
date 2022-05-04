import { AppBar, IconButton, Toolbar, Typography, Grid, Container } from '@mui/material'
import React from 'react'
import { Link } from "react-router-dom";

function Appbar() {
    const linkProps = [{
        "path": "/",
        "label": "Dashboard",
        "key": 1
    }, {
        "path": "/signUp",
        "label": "Sign Up",
        "key": 2
    }, {
        "path": "/signIn",
        "label": "Sign In",
        "key": 3
    }, {
        "path": "/about",
        "label": "About",
        "key": 4
    }, {
        "path": "/layout",
        "label": "Layout",
        "key": 5
    }]
    const getRoute = (path, label, key) => {
        return <Link
            key={key}
            style={{
                color: "red",
                textDecoration: "none",
                margin: 5
            }} to={path}>{label}</Link>
    }
    return (
        <AppBar
            sx={{
                bgcolor: "#252533",
                position: "relative",
                borderRadius: 5,
                marginBottom:3
            }}>
            <Container>
                <Toolbar
                    disableGutters={false}
                    sx={{
                        // bgcolor: "#090909",
                        padding: 2,
                        margin: 2
                    }}>
                    <Grid container>
                        <Grid item container spacing={1}
                            justifyContent={"center"}>
                            {linkProps.map((item) => (getRoute(item.path, item.label, item.key)))}
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Appbar