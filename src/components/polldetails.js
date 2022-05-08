

import { ArrowBackOutlined, RefreshRounded } from '@mui/icons-material'
import { CircularProgress, Grid, IconButton, List, ListItemButton, Paper, ToggleButton, Typography } from '@mui/material'
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
        <Paper
            sx={{
                backgroundColor: "background.cardBackground",
                minHeight: 194,
                padding: 2,
                marginBottom: 5
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
                        mb={2}
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
                            title={'show my polls'}
                            onClick={() => {
                                //::::::::::::::::::::::::::::::::::: DISPATCH 
                                dispatch(handleToPolls(false))
                            }}
                        ><ArrowBackOutlined sx={getIconDec} /></IconButton>
                    </Grid>
                    {vsps.length === 0 && onEmptyShowMessage('you have not created any poll yet, So nothing to display')}
                    {vsps.map((data) => (
                        <Box
                            m={2}
                            style={{
                                width: '100%'
                            }}
                            key={data.pid}
                        >
                            <GetChartSection pollInfo={data.poll} deepInfo={data.cids} />
                            <Box
                                m={2}
                                borderRadius={2}
                                sx={{
                                    width: '100%',
                                    height: 4,
                                    backgroundColor: 'background.main'
                                }} ></Box>
                        </Box>
                    ))
                    }
                </Grid></Grid>
        </Paper>
    )
}

export default PollDetails