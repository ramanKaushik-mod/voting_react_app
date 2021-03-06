

import { ArrowBackOutlined, RefreshRounded } from '@mui/icons-material'
import { Card, CircularProgress, Grid, IconButton, List, ListItemButton, Paper, ToggleButton, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPollData, getVSPSSelector, getVSPS_THUNK, handleToPolls, selectIsPending } from '../features/mainSlice'
import GetChartSection, { onEmptyShowMessage } from '../features/Utility/utility'


function PollDetails() {


    const getIconDec = {
        color: 'red'
    }
    const [refresh, setRefresh] = useState(false)

    const dispatch = useDispatch()

    // IMPORTED SELECTORS
    const pollData = useSelector(getPollData)
    const vsps = useSelector(getVSPSSelector)
    const isVSPSPending = useSelector(selectIsPending)

    useEffect(() => {
        function fetchData(data) {
            dispatch(getVSPS_THUNK(JSON.stringify({ 'pollInfo': data.pollInfo })))
        }
        if (pollData.length != 0) {
            let data = {
                'pollInfo': []
            }
            for (let i = 0; i < pollData.length; i++) {
                const element = pollData[i];
                let pid = element.pollId
                let cids = element.candidates
                data.pollInfo.push({ 'pid': pid, 'cids': cids })
            }
            fetchData(data)
        }
    }, [refresh])


    return (
        <Card
        elevation={10}
            sx={{
                backgroundColor: "transparent",
                minHeight: 194,
                padding: 2,
                marginBottom: 5,
                borderRadius:4
            }}>
            <Grid container justifyContent={"center"}>
                <Grid container item
                    sx={{
                        width: '100%'
                    }}
                    direction={'row'}
                    justifyContent={'center'}
                >
                    <Grid item container
                        p={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        direction={'row-reverse'}
                        sx={{
                            width: '100%',
                            backgroundColor: 'background.black',
                            borderRadius: 2
                        }}
                    >
                        {!isVSPSPending ? <IconButton
                            title={'refresh dashboard'}
                            onClick={() => {
                                if (!isVSPSPending) {
                                    setRefresh(!refresh)
                                }
                            }}
                        >
                            <RefreshRounded sx={{
                                color: 'red'
                            }} />
                        </IconButton> : <Typography color='red'>
                            ...is refreshing
                        </Typography>}

                        <IconButton
                            title={'back to dashboard'}
                            onClick={() => {
                                //::::::::::::::::::::::::::::::::::: DISPATCH 
                                dispatch(handleToPolls(false))
                            }}
                        ><ArrowBackOutlined sx={getIconDec} /></IconButton>
                    </Grid>
                    {vsps.length === 0 && onEmptyShowMessage('you have not created any poll yet, So nothing to display')}
                    {vsps.map((data) => (
                        <Grid container
                            justifyContent={'center'}
                            alignItems={'center'}
                            m={2}
                            style={{
                                width: '100%'
                            }}
                            key={data.pid}
                        >
                            <Grid item>
                                <GetChartSection pollInfo={data.poll} deepInfo={data.cids} />

                            </Grid>
                            <Grid item container>
                                <Box
                                    m={2}
                                    borderRadius={2}
                                    sx={{
                                        width: '100%',
                                        height: 2,
                                        backgroundImage:'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)'
                                    }} ></Box>

                            </Grid>
                        </Grid>
                    ))
                    }
                </Grid></Grid>
        </Card>
    )
}

export default PollDetails