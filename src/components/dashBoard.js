import { Add, ArrowBack, ArrowForward, ArrowForwardIosOutlined, Clear, Create, Delete, ExpandLess, ExpandMore, Inbox, ListAltOutlined, Poll, PollOutlined } from '@mui/icons-material'
import { Grid, List, ListItemButton, ListItemIcon, ListSubheader, Paper, ListItemText, Collapse, ListItem, IconButton, TextField, Button, Typography, Slide, Snackbar, CircularProgress, LinearProgress, Box, Card, CardHeader, CardContent, Avatar, CardActions, Table, TableBody, TableCell, TableRow, Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleToPolls, pollPendingStatus, pollRegStatus, resetPollRegStatus, selectAuthStatus, selectCreatorData, selectIsPending, selectVoterData, shouldNavigate } from '../features/mainSlice'
import { GetCandidateDetails, GetPolls } from '../features/Utility/utility'
import GetBox, { GetBoxNew, GetBoxNew2 } from './layout-components/getBox'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addCandidateThunk, addPollDetailsThunk, currentPollId, getPollData, getPollDetailsPending, getPollDetailsThunk, turnPidNull } from '../features/mainSlice'
import Voter from './voter'
import { getUserType } from '../features/mainSlice'
import PollDetails from './polldetails'
import VoterSubscriptions from './voterDetails'

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}



function DashBoard() {

  const getDec = {
    color: '#f2f2f2'
  }

  const getIconDec = {
    color: 'red'
  }

  const dispatch = useDispatch()
  const navigate = useSelector(shouldNavigate)
  const [startDate, setStartDate] = React.useState(null);
  const [tomorrow, setToday] = React.useState(null)
  const [endDate, setEndDate] = React.useState(null);
  const [minEndDate, setMinEndDate] = React.useState(new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 2));

  const [disableCP, setDCP] = useState(false)
  const [disableCD, setDCD] = useState(true)
  const [endeb, setENDEB] = useState(true)

  const [onceCalled, setOnceCalled] = useState(false)

  const handleDCP = () => {
    setDCP(true)
  }

  const [snackOpen, setSnackOpen] = React.useState(false);
  const [transition, setTransition] = React.useState(undefined);

  const handleSnackClick = (Transition) => () => {
    setTransition(() => Transition);
    setSnackOpen(true);
  };

  const handleClose = () => {
    setSnackOpen(false);
  };

  const authStatus = useSelector(selectAuthStatus)
  const userType = useSelector(getUserType)
  const pid = useSelector(currentPollId)
  const vData = useSelector(selectVoterData)
  const cData = useSelector(selectCreatorData)
  const isPending = useSelector(selectIsPending)
  const pollData = useSelector(getPollData)
  const prs = useSelector(pollRegStatus)
  const [candidateList, setCandidateList] = useState([])
  const [candidateName, setCandidateName] = useState(null)
  const [candidateManifest, setCandidateManifest] = useState(null)
  const [pollTitle, setPollTitle] = useState(null)
  const setHighState = () => {
    setCandidateName(null)
    setCandidateManifest(null)
  }
  const [open, setOpen] = React.useState(true)
  const [openPolls, setOpenPolls] = React.useState(true)

  const handleClick = () => {
    setToday(new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    ))
    setStartDate(null)
    setEndDate(null)
    setCandidateList([])
    setDCP(false)
    dispatch(turnPidNull())
    setOnceCalled(!onceCalled)
    setENDEB(true)
    setOpen(!open);
  };
  const handleOpenPolls = () => {
    if (isPending != true && openPolls) {
      dispatch(getPollDetailsThunk(JSON.stringify({ '_email': cData[1] })))
    }
    setOpenPolls(!openPolls)
  }

  const getWhatHappend = () => {
    switch (authStatus) {
      case 190:
        return 'user does not exist, sign up or re-check your ID'
      case 151:
        return 'wrong password'
    }
  }

  const getListItem = (callback) =>
    <Grid item container
      justifyContent={'center'}
      direction={'row'}
      sx={{
        width: '100%'
      }}
    >
      {prs === 0 && <Box
        sx={{
          width: '100%',
          backgroundColor: '#0d102f',
          borderRadius: 2
        }}
      >
        <Grid
          item container
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}
          sx={{
            width: '100%',
            background: '#24232',
            padding: 2,
            borderRadius: 4,
            margin: 1
          }}
        >
          <Grid item>
            <TextField
              disabled={disableCP}
              multiline={true}
              label={'POLE TITLE'}
              onChange={(e) => {
                setPollTitle(e.target.value)
              }}
              placeholder={'POLE TITLE'}
              variant='filled'
              required={true}
              sx={{
                borderRadius: 5,
                width: 240,
                marginBottom: 1
              }}
            ></TextField>

          </Grid>
          <Grid item>
            <LocalizationProvider dateAdapter={AdapterDateFns}>

              <Grid item component={'form'} container
                justifyContent={'center'}
                alignItems={'center'}
                direction={'column'}
              >
                <Grid item>

                  <DatePicker
                    disabled={disableCP}
                    minDate={tomorrow}
                    required={true}
                    label="START-DATE"
                    value={startDate}

                    onChange={(newValue) => {

                      if (newValue) {
                        setStartDate(newValue);
                        setENDEB(false)   //enabling enddate field
                        setMinEndDate(new Date(
                          new Date().getFullYear(),
                          new Date().getMonth(),
                          new Date(newValue).getDate() + 1))
                      }

                    }}
                    renderInput={(params) => <TextField {...params} />} />
                </Grid>
                <Grid item mt={1}>

                  <DatePicker

                    disabled={disableCP || endeb}
                    minDate={minEndDate > startDate ? minEndDate : startDate}

                    label="END-DATE"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </Grid>
              </Grid></LocalizationProvider></Grid>
          <Grid
            item container component={'form'}
            justifyContent={'center'}
          >
            <Grid item>
              {
                !isPending ? <Button
                  disabled={disableCP}
                  sx={{
                    marginTop: 1
                  }}
                  variant={'outlined'}
                  type='reset'
                  onClick={(e) => {
                    if (startDate != null && endDate != null && pollTitle != null) {
                      const data = {
                        _email: cData[1],
                        _createdate: new Date(),
                        _startdate: startDate,
                        _enddate: endDate,
                        _title: pollTitle
                      }
                      dispatch(addPollDetailsThunk(JSON.stringify(data)))
                      handleDCP()
                    }
                  }}
                >Create Poll
                </Button> : <CircularProgress />}
            </Grid>
          </Grid>

        </Grid></Box>
      }
      <Box

        display={prs === 200 ? 'block' : 'none'}
        m={1}
        sx={{
          width: '100%',
          backgroundColor: '#0d102f',
          borderRadius: 3
        }}>
        <Grid
          container
          sx={{
            width: '100%',
            // background:'#123432',
            padding: 2,
            borderRadius: 4,
            margin: 1
          }}
        >
          <Grid item container spacing={1} component={'form'}
            justifyContent={'center'}
            direction={'column'}
            alignItems={'center'}
          >
            <Grid item>
              <TextField
                label={'NAME'}
                onChange={(e) => {
                  setCandidateName(e.target.value)
                }}
                placeholder={'CANDIDATE NAME'}
                variant='filled'
                required={true}
                sx={{
                  borderRadius: 5,
                  width: 240
                }}
              ></TextField>
            </Grid>
            <Grid item>
              <TextField
                multiline={true}
                label={'CANDIDATE MANIFESTO'}
                onChange={(e) => {
                  setCandidateManifest(e.target.value)
                }}
                placeholder={'MANIFESTO'}
                variant='filled'
                required={true}
                sx={{
                  borderRadius: 5,
                  minWidth: 240
                }}
              ></TextField>
            </Grid>
            <Grid item container
              justifyContent={'center'}
              alignItems={'center'}

            >
              <Grid item>
                {!isPending && <Button
                  sx={{
                    marginTop: 1.5,
                    width: 100
                  }}
                  variant={'outlined'}
                  type='reset'
                  onClick={(e) => {
                    if (candidateName != null && candidateName.length > 6
                      && candidateManifest != null && candidateManifest.length > 20
                      && pid != null
                    ) {
                      let key = candidateList.length
                      let obj = { candidateName, candidateManifest, key, pid }
                      setCandidateName(null)
                      setCandidateManifest(null)
                      let list = candidateList
                      list[key] = obj
                      if (list.length === 2) {
                        dispatch(addCandidateThunk(JSON.stringify({ 'cArr': list })))
                        callback()
                      } else if (list.length > 2) {
                        dispatch(addCandidateThunk(JSON.stringify({ 'cArr': [obj] })))
                        callback()
                      } else {
                        setCandidateList(list)
                      }
                    }
                  }}
                >add candidate to poll
                </Button>}
                {isPending && <LinearProgress sx={{
                  width: 200,
                  marginTop: 2
                }}></LinearProgress>}
              </Grid>
            </Grid>
          </Grid></Grid></Box>

    </Grid>


  const sectionOne = (data) => <Grid container
    justifyContent={'center'}
    alignItems={'center'}
    direction={"column"}
    mt={1}
    mb={2}
    pb={3}
    sx={{
      backgroundColor: '#0d102a',
      width: '100%',
      borderRadius: 2
    }}>

    <Grid item container sx={{ width: '100%' }}
      justifyContent={'center'} direction={'column'} px={4}>

      <Grid item >
        {userInfo(data)}

      </Grid>
    </Grid>
    <Grid item container sx={{ width: '100%' }}
      justifyContent={'center'} direction={'column'} px={4}>

      <Collapse in={!open} timeout="auto" unmountOnExit>
        {getListItem(setHighState)}
        <Grid item
          container
          sx={{
            width: '100%'
          }}
          mt={2}
          direction={'row'}
          justifyContent={'center'}>
          <GetCandidateDetails
            data={candidateList}
          />
        </Grid>
      </Collapse>
      <Collapse in={!openPolls} timeout="auto" unmountOnExit>
        <GetPolls></GetPolls>
      </Collapse>

    </Grid>




    {pollData.length !== 0 && !isPending && <Grid
      container
      minWidth={630}
      maxWidth={630}
      direction={'row'}
      justifyContent={'center'}>

    </Grid>}
  </Grid>


  const userInfo = (data) => <Grid item
    sx={{
      backgroundColor: 'black',
      width: '100%',
    }} >
    {/*  */}
    <Card

      sx={{
        backgroundColor: 'black',
        width: '100%',
      }}>

      <CardHeader
        sx={{
          color: 'white',
          backgroundColor: 'black',
        }}
        title={`${data[3]}`.toUpperCase()}>

      </CardHeader>

      <CardContent
        sx={{
          backgroundColor: '#0d102a',
          color: '#f2f2f2',
          width: '100%'
        }}
      >
        <Grid container
          justifyContent={'center'}
          alignItems={'center'}
          direction={'row'}
        >
          <Grid item>
            <Avatar
              component={'div'}
              sx={{
                width: 200,
                height: 200,
                objectFit: 'cover',
                borderRadius: 4
              }}
              src={require('./images/file.jpg')}
            >


            </Avatar>

          </Grid>
          <Grid item
            sx={{
              backgroundColor: '#242429',
              marginX: 4
            }}
          >
            <Table
              sx={{
                backgroundColor: 'black'
              }}
            >
              <TableBody>
                <TableRow sx={{
                  color: 'white'
                }}>
                  <TableCell sx={getDec}>Name</TableCell>
                  <TableCell sx={getDec}>{`${data[0]}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={getDec}>Email</TableCell>
                  <TableCell sx={getDec}>{`${data[1]}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={getDec}>Contact</TableCell>
                  <TableCell sx={getDec}>{`${data[2]}`}</TableCell>
                </TableRow>

              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions >
        <Grid container
          sx={{ width: '100%' }}>
          <Grid item>
            <IconButton
              title={'show my polls'}
              onClick={() => {
                //::::::::::::::::::::::::::::::::::: DISPATCH 
                dispatch(handleToPolls(true))
              }}
            ><ArrowForwardIosOutlined sx={getIconDec} /></IconButton>
          </Grid>
        </Grid>
        <IconButton
          title={'create poll'}
          onClick={() => {
            dispatch(resetPollRegStatus())
            handleClick()
          }}
        >{open ? <Create sx={getIconDec} /> : <Clear sx={getIconDec}></Clear>}</IconButton>
        <IconButton
          title={'polls'}
          onClick={handleOpenPolls}
        >{openPolls ? <PollOutlined sx={getIconDec} /> : <Clear sx={getIconDec} />}</IconButton>
      </CardActions>
    </Card>
  </Grid>

  return (
    <Box
      pt={11}
      sx={{
        minWidth: 1300,
        backgroundColor: '#0d102f'
      }}>


      {/* <Snackbar
          open={open}
          onClose={handleClose}
          TransitionComponent={transition}
          message="I love snacks"
          key={transition ? transition.name : ''}
        /> */}


      <Grid container
        sx={{
          width: '100%',
        }}>
        {userType === 'c' && <GetBoxNew2 content={!navigate ? sectionOne(cData) : <PollDetails></PollDetails>}></GetBoxNew2>}
        {userType === 'v' && <GetBoxNew2 content={!navigate ? <Voter vData={vData} /> : <VoterSubscriptions />}></GetBoxNew2>}</Grid>
    </Box>
  )
}

export default DashBoard