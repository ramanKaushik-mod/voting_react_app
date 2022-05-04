import { Grid } from '@mui/material'
import { purple, red, yellow } from '@mui/material/colors'
import { Box } from '@mui/system'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import Appbar from './Appbar';
import GetBox from './layout-components/getBox';


function Layout() {
    const appbar = <Appbar></Appbar>
    return (
        <Grid container justifyContent={"center"} mt={3} spacing={1}>
            <Grid item xs={12} sm={10} md={10}>
                <GetBox height={400} c="#292732"></GetBox>
            </Grid>
            <Grid item xs={12} sm={10} md={10}>
                <GetBox height={400} c="#282630"></GetBox>
            </Grid>
            <Grid item xs={12} sm={10} md={10}>
                <GetBox height={400} c="#262730"></GetBox>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <GetBox height={200} c="#262730"></GetBox>
            </Grid>
        </Grid>

    )
}

export default Layout