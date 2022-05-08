

import { ArrowBackOutlined, ExpandLess, ExpandMore, Poll, RefreshRounded } from '@mui/icons-material'
import { Box, Button, CircularProgress, Collapse, Divider, FormControl, FormControlLabel, Grid, IconButton, ListItemButton, ListItemIcon, ListItemText, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableHead, TableRow, ToggleButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Chart as chartjs } from "chart.js/auto";
import { Bar } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux'
import { PollData } from '../features/Utility/utility'
import { gpdfvArrSelector, selectVoterData, selectIsPending, gpdfvTHUNK, gVPIDSSelector, votingTHUNK, handleToPolls, getProgressForPID, handleProgressForPID } from '../features/mainSlice'


function VoteSection({ cArr, vID, pID, refresh }) {

    const getDec = {
        color: 'text.light',
        fontWeight: 300
    }
    const dispatch = useDispatch()
    const [candidateId, setValue] = useState('')
    const isPending = useSelector(selectIsPending)
    const progressForPID = useSelector(getProgressForPID)

    const handleChange = (e) => {
        console.log(e.target.value, 'value it is ')
        setValue(e.target.value)
    }

    return (
        <Grid container
            justifyContent={'center'}
            alignItems={'left'}
            direction={'column'}
            minWidth={500}
            p={2}
            sx={{
                borderRadius: 2,
                backgroundColor: 'background.light'
            }}
            spacing={1}
        >
            <Grid item>
                <Typography
                    fontWeight={400}
                    sx={{
                        color: 'text.light'
                    }}>
                    {"It's your time\nchoose the right one"}
                </Typography>
            </Grid>
            <Grid item>
                <RadioGroup
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={candidateId}
                    onChange={handleChange}
                >
                    <Table size={'small'}>


                        <TableHead>
                            <TableRow>
                                <TableCell sx={getDec} align='right'>Candidate</TableCell>
                                <TableCell sx={getDec} align='right'>Your Vote matters</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cArr.map(item => (
                                <TableRow key={item.cID}>
                                    <TableCell sx={getDec} align='right'>
                                        {item.cName}
                                    </TableCell>
                                    <TableCell sx={getDec} align='right'>
                                        <FormControlLabel sx={{
                                            color: 'text.purple',
                                            borderRadius: 2,
                                            paddingRight: 2
                                        }}
                                            disabled={isPending ? true : false}
                                            value={item.cID}
                                            control={<Radio
                                                size='small' sx={{
                                                    color: 'background.radio',
                                                }}
                                            />}
                                            label=''
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table></RadioGroup>
            </Grid>
            <Grid item>
                <Typography

                    fontWeight={400}
                    sx={{
                        color: 'text.light'
                    }}>
                    {"Submit your response"}
                </Typography>
            </Grid>
            <Grid item>
                {(!isPending && progressForPID !== pID) ? <Button
                    disabled={candidateId === '' ? true : false}
                    variant='outlined'
                    onClick={() => {
                        dispatch(handleProgressForPID(pID))
                        dispatch(votingTHUNK(JSON.stringify({ '_vid': vID, '_pid': pID, '_cid': candidateId })))
                        refresh()
                    }}
                    sx={{
                        accentColor: 'text.light',
                        color: 'background.radio',
                        borderColor: 'text.light'
                    }}
                >
                    Press me to Vote
                </Button> : (progressForPID === pID && <CircularProgress size='2rem' />)}
            </Grid>
        </Grid>
    )
}


function GetChartSectionForVoter({ pollInfo, cArr, vsov, vID, refresh }) {

    let cNames = []
    cArr.forEach((item) => {
        cNames.push(item.cName)
    })

    let cVoteCount = []

    cArr.forEach((item) => {
        cVoteCount.push(item.voteCount)
    })


    return (
        <Grid
            container
            sx={{
                width: '100%',

            }}
            direction={'row'}
            justifyContent={'center'}
        >
            <Grid item
                bgcolor={'background.cardBackground'}
                p={3}
                sx={{ width: '50%' }}>

                <Grid item
                    container
                    justifyContent={'center'}
                    alignItems={'left'}
                    direction={'column'}
                ><Grid item>
                        <PollData deepInfo={pollInfo} />
                    </Grid>
                    <Grid item>
                        {!vsov
                            ? <VoteSection cArr={cArr} pID={pollInfo.pollId} vID={vID} refresh={refresh} />
                            : <Grid item container
                                justifyContent={'center'}
                                alignItems={'center'}
                                minHeight={80}
                                width={400}
                                pr={10}
                                pl={2}
                                sx={{
                                    borderRadius: 4,
                                    backgroundColor: 'background.main'
                                }}
                                spacing={1}
                            >
                                <Typography

                                    fontWeight={400}
                                    sx={{
                                        color: 'text.main2'
                                    }}>
                                    {`${'you have already voted for this poll'.toUpperCase()}`}
                                </Typography>

                            </Grid>}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item

                sx={{ width: '50%', }}>
                <Box
                    bgcolor={'background.light'}
                    p={2}
                    borderRadius={2}
                >
                    <Bar
                        data={{
                            labels: cNames,   // should contain candidate names
                            datasets: [{
                                label: '# of Votes',
                                data: cVoteCount,    // should contain the votes
                                borderColor: 'yellow',
                                borderWidth: 1,
                            }]
                        }}
                        height={400}
                        width={500}
                        options={{
                            maintainAspectRatio: false
                        }}
                    />
                </Box></Grid>
        </Grid>
    )
}

export default function VoterSubscriptions() {

    const getIconDec = {
        color: 'red'
    }

    const [refresh, setRefresh] = useState(false)
    const vpidsArr = useSelector(gVPIDSSelector)
    const isPending = useSelector(selectIsPending)
    const vData = useSelector(selectVoterData)
    const data = useSelector(gpdfvArrSelector)
    const dispatch = useDispatch()

    const handleRefresh = () => {
        setRefresh(!refresh)
    }
    console.log(data, vpidsArr)
    useEffect(() => {
        dispatch(gpdfvTHUNK(JSON.stringify({ '_pidArr': vpidsArr, '_email': vData.voterId })))
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

                <Grid
                    container
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
                        {!isPending ? <IconButton
                            onClick={() => {
                                if (!isPending) {
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
                    {/* for data */}
                    {data.map((d) => (
                        <Box
                            m={2}
                            style={{
                                width: '100%',
                            }}
                            key={d.pollInfo.pollId}
                        >
                            <GetChartSectionForVoter
                                pollInfo={d.pollInfo}
                                vsov={d.vsov}
                                cArr={d.cArr}
                                vID={vData.voterId}
                                refresh={handleRefresh}
                            />
                            <Box
                                m={2}
                                borderRadius={2}
                                sx={{
                                    width: '100%',
                                    height: 4,
                                    backgroundColor: 'background.main'
                                }} ></Box>
                        </Box>
                    ))}
                </Grid></Grid>
        </Paper>
    )
}

