import React from 'react';
import { Box, Grid } from '@mui/material/';
import { CircleOutlined } from '@mui/icons-material'
import 'aos/dist/aos.css'

export default function VerticalLinearStepper() {
    return (
        <Box
            px={10}
            pt={4}
            pb={8}
            sx={{
                backgroundColor: 'background.light',
                width: '100%'
            }}>
            <Grid container
                direction={'row'}
                justifyContent={'space-evenly'}
            >
                <Grid item container
                    alignItems={'center'}
                    bgcolor={'transparent'}
                    direction={'column'}

                    sx={{
                        width: '5%'
                    }}
                >
                    <CircleOutlined sx={{
                        color: 'background.cardBackground'
                    }} />
                    <Box

                        sx={{
                            height: '95%',
                            width: 2,
                            backgroundColor: 'background.cardBackground'
                        }}
                    />
                </Grid>
                <Grid item container
                    data-aos={'fade-up'}
                    bgcolor={'transparent'}
                    direction={'row'}
                    py={10}
                    sx={{
                        width: '90%'
                    }}>
                    <Grid
                        position={'relative'}
                        ml={-10}
                    >
                        <Box
                            height={600}
                            width={600}
                            bgcolor={'white'}
                            borderRadius={'50%'}
                            boxShadow={'0 0 50px #490064'}
                        />
                    </Grid>
                    <Grid
                        position={'relative'}
                        ml={-10}
                    >
                        <Box
                            height={300}
                            width={500}
                            bgcolor={'white'}
                            borderRadius={'50%'}
                            boxShadow={'0 0 50px green'}
                        />
                    </Grid>

                    <Grid item
                        position={'absolute'}
                        ml={-10}
                    >
                        <video loop autoPlay muted style={{
                            width: '100%',
                            borderRadius: 20
                        }}>
                            <source src={require('./videoFile.mp4')} type="video/mp4" />
                        </video>
                    </Grid>
                </Grid>

                {/* <Grid item container
                    data-aos={'fade-right'}
                    bgcolor={'transparent'}
                    mt={-2}
                    sx={{
                        width: '90%'
                    }}>
                    <Grid item
                        ml={-10}>
                        <Card
                            sx={{
                                width: '50%'
                            }}
                        >
                            <CardContent>
                                {`${VOTING_MOTIVE}`}
                            </CardContent>
                        </Card></Grid>
                </Grid> */}
            </Grid>
        </Box>
    );
}

