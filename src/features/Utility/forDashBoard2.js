import React from 'react';
import { Box, Grid, Card, CardActions } from '@mui/material/';
import { CircleOutlined } from '@mui/icons-material'
import 'aos/dist/aos.css'

export default function VerticalLinearStepper() {

    const wrapper = (video) => <Grid container
        direction={'row'}
        justifyContent={'space-evenly'}
    >
        <Grid item container
            alignItems={'center'}
            direction={'column'}

            sx={{
                width: '5%'
            }}
        >
            <CircleOutlined sx={{
                color: 'background.white'
            }} />
            <Box
                height={'750px'}
                sx={{
                    width: 2,
                    backgroundColor: 'background.white'
                }}
            />
        </Grid>
        <Grid item container
            data-aos={'fade-left'}
            bgcolor={'transparent'}
            direction={'row'}
            py={10}
            sx={{
                width: '90%'
            }}>

            <Grid item
                position={'absolute'}
                ml={-10}
            >
                <Card
                    elevation={10}
                    sx={{
                        borderRadius: 4,
                        backgroundColor:'transparent',
                        padding: 2
                    }}
                >
                <video playbackRate={2} loop autoPlay muted style={{
                    width: '100%',
                    borderRadius: 10
                }}>
                    <source src={video} type="video/mp4" />
                </video>
                </Card>

            </Grid>
        </Grid>


    </Grid>
    return (
        <Box
            px={10}
            pt={4}
            // pb={8}
            sx={{
                backgroundColor: 'transparent',
                width: '100%'
            }}>
                {wrapper(require('./creator.mp4'))}
                {wrapper(require('./voter.mp4'))}
        </Box>
    );
}

