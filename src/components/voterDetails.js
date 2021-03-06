

import { ArrowBackOutlined, ExpandLess, ExpandMore, Poll, RefreshRounded } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CircularProgress, Collapse, Divider, FormControl, FormControlLabel, Grid, IconButton, ListItemButton, ListItemIcon, ListItemText, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableHead, TableRow, ToggleButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Chart as chartjs } from "chart.js/auto";
import { Bar } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux'
import { PollData } from '../features/Utility/utility'
import { gpdfvArrSelector, selectVoterData, selectIsPending, gpdfvTHUNK, gVPIDSSelector, votingTHUNK, handleToPolls, getProgressForPID, handleProgressForPID, handleSnackBar } from '../features/mainSlice'

const isActiveOrNot = (startDate, endDate) => {
    startDate = new Date(`${new Date(startDate).getMonth() + 1}/${new Date(startDate).getDate()}/${new Date(startDate).getFullYear()}`)
    endDate = new Date(`${new Date(endDate).getMonth() + 1}/${new Date(endDate).getDate()}/${new Date(endDate).getFullYear()}`)

    if (((new Date(startDate) <= new Date()) && (new Date(endDate) > new Date())) || ((new Date(startDate) < new Date()) && (new Date(endDate) >= new Date()))) {
        return 'Active'
    } else if (new Date(startDate) > new Date()) {
        return 'Will Active Soon'
    } else if (new Date(endDate) < new Date()) {
        return 'Closed'
    }
}

function VoteSection({ cArr, vID, pID, refresh, eD, sD }) {

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

    return (<Card
        elevation={10}
        sx={{
            borderRadius: 4,
            backgroundColor: 'transparent'
        }}
    >
        <Grid container
            justifyContent={'center'}
            alignItems={'left'}
            direction={'column'}
            minWidth={500}
            p={2}
            sx={{
                borderRadius: 2,
                backgroundColor: 'transparent'
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
                    disabled={candidateId === '' || isActiveOrNot(new Date(sD), new Date(eD)) !== 'Active' ? true : false}
                    variant='outlined'
                    onClick={() => {
                        dispatch(handleSnackBar('voting in progress'))
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
        </Grid></Card>
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
            <Card
                elevation={10}
                sx={{
                    width: '40%',
                    mr: '2',
                    backgroundColor: 'transparent',
                    marginRight: 3,
                    borderRadius: 4,
                    padding: 3
                }}
            >
                <Grid
                    container
                    justifyContent={'center'}
                    alignItems={'left'}
                    direction={'column'}
                ><Grid item>
                        <PollData deepInfo={pollInfo} />
                    </Grid>
                    <Grid item>
                        {isActiveOrNot(new Date(pollInfo['startdate']), new Date(pollInfo['enddate'])) === 'Active' ? (!vsov
                            ? <VoteSection cArr={cArr} pID={pollInfo.pollId} vID={vID} refresh={refresh} sD={pollInfo['startdate']} eD={pollInfo['enddate']} />
                            : <Grid item container
                                justifyContent={'center'}
                                alignItems={'center'}
                                minHeight={80}
                                width={400}
                                pr={10}
                                pl={2}
                                sx={{
                                    borderRadius: 4,
                                    backgroundColor: 'transparent'
                                }}
                                spacing={1}
                            >
                                <Typography

                                    fontWeight={400}
                                    sx={{
                                        color: 'text.accent',
                                        zIndex: 10
                                    }}>
                                    {`${'you have already voted for this poll'.toUpperCase()}`}
                                </Typography>

                            </Grid>) : <Box></Box>}
                    </Grid>
                </Grid>
            </Card>
            <Grid item

                sx={{ width: '50%', }}>
                <Card
                    elevation={10}
                    sx={{
                        opacity: 0.8,
                        backgroundImage: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
                        borderRadius: 2,
                        paddign: 2
                    }}
                >
                    <CardContent>
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
                                maintainAspectRatio: false,
                            }}
                        />
                    </CardContent>

                </Card></Grid>
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

        <Card
            elevation={10}
            sx={{
                backgroundColor: "transparent",
                minHeight: 194,
                padding: 2,
                marginBottom: 5,
                borderRadius: 4
            }}>
            <Grid container justifyContent={"center"}>

                <Grid
                    container item
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
                        {!isPending ? <IconButton
                            title={'refresh dashboard'}
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
                            title={'back to dashboard'}
                            onClick={() => {
                                //::::::::::::::::::::::::::::::::::: DISPATCH 
                                dispatch(handleToPolls(false))
                            }}
                        ><ArrowBackOutlined sx={getIconDec} /></IconButton>
                    </Grid>
                    {/* for data */}
                    {data.map((d) => (
                        <Grid container
                            justifyContent={'center'}
                            alignItems={'center'}
                            m={2}
                            style={{
                                width: '100%'
                            }}
                            key={d.pollInfo.pollId}
                        >
                            <Grid item>

                                <GetChartSectionForVoter
                                    pollInfo={d.pollInfo}
                                    vsov={d.vsov}
                                    cArr={d.cArr}
                                    vID={vData.voterId}
                                    refresh={handleRefresh}
                                />
                            </Grid>
                            <Grid item container>
                                <Box
                                    m={2}
                                    borderRadius={2}
                                    sx={{
                                        width: '100%',
                                        height: 2,
                                        backgroundImage: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
                                    }} ></Box>
                            </Grid>

                        </Grid>
                    ))}
                </Grid></Grid>
        </Card>
    )
}

