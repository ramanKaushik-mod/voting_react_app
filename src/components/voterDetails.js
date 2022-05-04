

import { ArrowBackOutlined, ExpandLess, ExpandMore, Poll, RefreshRounded } from '@mui/icons-material'
import { Box, Button, CircularProgress, Collapse, FormControl, FormControlLabel, Grid, IconButton, ListItemButton, ListItemIcon, ListItemText, Paper, Radio, RadioGroup, Table, TableBody, TableCell, TableHead, TableRow, ToggleButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Chart as chartjs } from "chart.js/auto";
import { Bar } from 'react-chartjs-2'
import { useSelector, useDispatch } from 'react-redux'
import { PollData } from '../features/Utility/utility'
import { gpdfvArrSelector, selectVoterData, selectIsPending, gpdfvTHUNK, gVPIDSSelector, votingTHUNK, handleToPolls } from '../features/mainSlice'


function VoteSection({ cArr, vID, pID, refresh }) {

    const dispatch = useDispatch()
    const [candidateId, setValue] = useState('')
    const isPending = useSelector(selectIsPending)

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
            pr={10}
            sx={{
                borderRadius: 2,
                backgroundColor: 'transparent'
            }}
            spacing={1}
        >
            <Grid item>
                <Typography
                    fontWeight={800}
                    sx={{
                        color: 'white'
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
                                <TableCell align='right'>Candidate</TableCell>
                                <TableCell align='right'>Your Vote matters</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cArr.map(item => (
                                <TableRow key={item.cID}>
                                    <TableCell align='right'>
                                        {item.cName}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <FormControlLabel
                                            disabled={isPending ? true : false}
                                            value={item.cID}
                                            control={<Radio
                                                size='small'
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

                    fontWeight={800}
                    sx={{
                        color: 'white'
                    }}>
                    {"Submit your response"}
                </Typography>
            </Grid>
            <Grid item>
                {!isPending ? <Button
                    disabled={candidateId === '' ? true : false}
                    variant='outlined'
                    onClick={() => {
                        dispatch(votingTHUNK(JSON.stringify({ '_vid': vID, '_pid': pID, '_cid': candidateId })))
                        refresh()
                    }}
                >
                    Press me to Vote
                </Button> : <CircularProgress size='2rem' />}
            </Grid>
        </Grid>
    )
}


function GetChartSectionForVoter({ pollInfo, cArr, vsov, vID, refresh }) {

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(!open)
    }
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
            <Grid item sx={open ? { width: '100%' } : {}}>

                {open ? <ListItemButton
                    onClick={
                        handleOpen
                    }>
                    <ListItemIcon>
                        <Poll sx={{ color: 'yellow' }} />
                    </ListItemIcon>
                    <ListItemText
                        sx={{
                            color: 'green'
                        }}
                        primary={
                            `${pollInfo.title}`
                        } />
                    {open ? <ExpandLess /> : <ExpandMore />}

                </ListItemButton>
                    : <Grid item
                        container
                        justifyContent={'center'}
                        alignItems={'left'}
                        direction={'column'}
                    ><Grid item>
                            <PollData deepInfo={pollInfo} close={handleOpen} />
                        </Grid>
                        <Grid item>
                            {!vsov
                                ? <VoteSection cArr={cArr} pID={pollInfo.pollId} vID={vID} refresh={refresh} />
                                : <Grid item container
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    minHeight={80}
                                    // minWidth={40}
                                    width={400}
                                    border={1}
                                    borderColor={'red'}
                                    pr={10}
                                    pl={2}
                                    sx={{
                                        borderRadius: 2,
                                        backgroundColor: 'transparent'
                                    }}
                                    spacing={1}
                                >
                                    <Typography

                                        fontWeight={200}
                                        sx={{
                                            color: 'yellow'
                                        }}>
                                        {`${'you have already voted for this poll'.toUpperCase()}`}
                                    </Typography>

                                </Grid>}
                        </Grid>
                    </Grid>
                }</Grid>
            <Grid item>
                <Collapse in={!open} timeout="auto" unmountOnExit>
                    <Box
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
                    </Box>
                </Collapse></Grid>
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

    useEffect(() => {
        dispatch(gpdfvTHUNK(JSON.stringify({ '_pidArr': vpidsArr, '_email': vData.voterId })))
    }, [refresh])
    return (

        <Paper
            sx={{
                backgroundColor: "#252533",
                minHeight: 194,
                borderRadius: 5,
                padding: 2
            }}>
            <Grid container justifyContent={"center"} spacing={1}>

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
                        mx={1}
                        mb={2}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        direction={'row-reverse'}
                        sx={{
                            width: '100%',
                            backgroundColor: 'black',
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

                    {!isPending
                        ? data.map((d) => (
                            <Box
                                style={{
                                    width: '100%'
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
                            </Box>
                        ))

                        :
                        <CircularProgress />}
                </Grid></Grid>
        </Paper>
    )
}

