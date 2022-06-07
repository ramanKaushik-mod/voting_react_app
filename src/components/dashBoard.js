import { ArrowForwardIosOutlined, Clear, Create, PollOutlined, EditOutlined, SyncAltOutlined } from '@mui/icons-material'
import { Grid, Collapse, IconButton, TextField, Button, CircularProgress, LinearProgress, Box, Card, CardHeader, CardContent, Avatar, CardActions, Table, TableBody, TableCell, TableRow, Divider } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { faauiTHUNK, handleSnackBar, handleToPolls, getUserImg, getUserImgStatus, isUserImgPendingSelector, pollRegStatus, resetPollRegStatus, selectAuthStatus, selectCreatorData, selectIsPending, selectVoterData, shouldNavigate, isSignedInSelector } from '../features/mainSlice'
import { GetCandidateDetails, GetPolls, getTextField } from '../features/Utility/utility'
import { GetBoxNew2 } from './layout-components/getBox'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addCandidateThunk, addPollDetailsThunk, currentPollId, getPollDetailsThunk, turnPidNull } from '../features/mainSlice'
import Voter from './voter'
import { getUserType } from '../features/mainSlice'
import PollDetails from './polldetails'
import VoterSubscriptions from './voterDetails'
import '../App.css'
import { useStyles } from '../styles/styles'


function DashBoard() {
  const classes = useStyles()

  const getDec = {
    color: '#f2f2f2'
  }

  const getIconDec = {
    color: 'red'
  }

  const dispatch = useDispatch()
  const navigate = useSelector(shouldNavigate)
  const [startDate, setStartDate] = useState(null);
  const [hFlag, setHFlag] = useState(false)

  const [tomorrow, setToday] = useState(null)
  const [endDate, setEndDate] = useState(null);
  const [minEndDate, setMinEndDate] = useState(new Date(
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

  const inputFileRef = useRef(null)
  const imageUrl = useSelector(getUserImg)
  const handleImageIconButton = () => {
    inputFileRef.current.click()
  }

  const handleImageChange = (e) => {
    const uploadable = e.target.files[0]

    new Promise((resolve, reject) => {
      const fr = new FileReader()
      fr.readAsDataURL(uploadable)
      fr.onload = () => {
        resolve(fr.result)
        let res = fr.result
        dispatch(faauiTHUNK(JSON.stringify({
          type: 'POST',
          id: cData['id'],
          imageUrl: `${res}`,
          person: cData['person']
        })))
      }
      fr.onerror = (error) => {
        reject(error)
      }
    })
  }

  useEffect(() => {
    if (imageUrl === null) {
      if (userType === 'c') {
        dispatch(faauiTHUNK(JSON.stringify({
          type: 'GET',
          id: cData['id'],
          person: cData['person']
        })))
      } else if (userType === 'v') {

        dispatch(faauiTHUNK(JSON.stringify({
          type: 'GET',
          id: vData['id'],
          person: vData['person']
        })))
      }

    }
  }, [])


  const authStatus = useSelector(selectAuthStatus)
  const userType = useSelector(getUserType)
  const pid = useSelector(currentPollId)
  const vData = useSelector(selectVoterData)
  const cData = useSelector(selectCreatorData)
  const isPending = useSelector(selectIsPending)
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

  const getListItem = (callback) =>
  <Card
  
  elevation={10}
    sx={{
      backgroundColor:'transparent',
      marginTop:2,
      borderRadius:4,
      padding:2
    }}
  >
    <Grid item container
      justifyContent={'center'}
      alignItems={'center'}
      direction={'row'}
      sx={{
        width: '100%'
      }}
    >
      {prs === 0 && <Box
        sx={{
          width: '100%',
          backgroundColor: 'transparent',
        }}
      >
        <Grid
          item container
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}
          sx={{
            width: '100%',
            padding: 2,
            margin: 1
          }}
        >
          <Grid item>
            <TextField
              disabled={disableCP}
              label={'POLE TITLE'}
              onChange={(e) => {
                setPollTitle(e.target.value)
              }}
              placeholder={'POLE TITLE'}
              variant='filled'
              required={true}
              sx={{

                backgroundColor: "transparent",
                width: 340,
                marginBottom: 1,
                color: 'text.light',
                accentColor: 'text.light'
              }}

              InputLabelProps={{
                className: 'textFieldColor_label'
              }}
              InputProps={{
                className: 'textFieldColor_label'
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
                    }} InputLabelProps={{
                      className: 'textFieldColor_label'
                    }}
                    InputProps={{
                      className: 'textFieldColor_label'
                    }}
                    renderInput={(params) => <TextField variant='filled' sx={{

                      width: 340,
                    }} InputLabelProps={{
                      className: 'textFieldColor_label'
                    }} {...params} />} />
                </Grid>
                <Grid item mt={1}>

                  <DatePicker

                    disabled={disableCP || endeb}
                    minDate={minEndDate > startDate ? minEndDate : startDate}

                    label="END-DATE"
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }} InputLabelProps={{
                      className: 'textFieldColor_label'
                    }}
                    InputProps={{
                      className: 'textFieldColor_label'
                    }}
                    renderInput={(params) => <TextField variant='filled' sx={{

                      width: 340,
                    }} InputLabelProps={{
                      className: 'textFieldColor_label'
                    }}
                      InputProps={{
                        className: 'textFieldColor_label'
                      }} {...params} />}
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
                    marginTop: 2,
                    color: 'text.light',
                    borderColor: 'text.light'
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
                </Button> : <Box
                  m={1}
                ><CircularProgress size={'2rem'} /></Box>}
            </Grid>
          </Grid>

        </Grid></Box>
      }
      <Box

        display={prs === 200 ? 'block' : 'none'}
        sx={{
          width: '100%',
          backgroundColor: 'transparent',
        }}>
        <Grid
          item container
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}
          sx={{
            width: '100%',
            padding: 2,
            margin: 2
          }}
        >
          <Grid item container component={'form'}
            justifyContent={'center'}
            direction={'column'}
            alignItems={'center'}
            pr={3}
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

                  backgroundColor: "transparent",
                  width: 340,
                  marginBottom: 1,
                  color: 'text.light',
                  accentColor: 'text.light'
                }}

                InputLabelProps={{
                  className: 'textFieldColor_label'
                }}
                InputProps={{
                  className: 'textFieldColor_label'
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

                  backgroundColor: "transparent",
                  width: 340,
                  marginBottom: 1,
                  color: 'text.light',
                  accentColor: 'text.light'
                }}

                InputLabelProps={{
                  className: 'textFieldColor_label'
                }}
                InputProps={{
                  className: 'textFieldColor_label'
                }}
              ></TextField>
            </Grid>
            <Grid item

            >
              <Grid item>
                {!isPending && <Button
                  sx={{
                    marginTop: 1.5,
                    width: 100,
                    borderColor: 'text.light',
                    color: 'text.light'
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

    </Grid></Card>


  const sectionOne = (data) => <Grid container
    justifyContent={'center'}
    alignItems={'center'}
    direction={"column"}
    pt={3}
    pb={10}
    sx={{
      backgroundColor: 'transparent',
      width: '100%',
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
  </Grid>


  const userInfo = (data) => <Card
    elevation={10}
    sx={{
      backgroundColor: 'transparent',
      borderRadius: 4
    }}>

    <CardHeader
      sx={{
        color: 'text.light',
      }}
      title={`${data[3]}`.toUpperCase()}>

    </CardHeader>

    <CardContent
    >
      <Grid container
        justifyContent={'center'}
        alignItems={'center'}
        direction={'row'}
      >
        <Grid item container
          justifyContent={'right'}
          sx={{
            width: '50%',
          }}
        >
          <Grid item
            sx={{
              width: '100%',
              border: 1,
              marginBottom: 2,
              borderColor: 'text.light',
              borderRadius: 4

            }}
            position={'relative'}
          >
            <Avatar
              component={'div'}
              sx={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: 4,
                backgroundColor: 'background.cardBackground',
                color: 'black'
              }}
              src={imageUrl === null ? null : imageUrl}
            >


            </Avatar></Grid>
          <Grid item container
            sx={{
              opacity: 0.4,
              width: 200,
              height: 200,
              backgroundColor: 'black',
              borderRadius: 4
            }}

            justifyContent={'right'}
            alignItems={'right'}
            direction={'row'}
            position={'absolute'}
          >
            <Grid item><IconButton
              sx={{
              }}
              onClick={() => {
                handleImageIconButton()
              }}
            >
              <EditOutlined sx={{
                color: 'black',
                backgroundColor: 'white',
                borderRadius: '50%',
                padding: 1
              }}></EditOutlined>
            </IconButton>
              <input
                multiple={false}
                onChange={handleImageChange}
                ref={inputFileRef}
                style={{
                  display: 'none'
                }}
                type={'file'}></input>

            </Grid>

          </Grid>


        </Grid>
        <Grid item container
          sx={{
            backgroundColor: '#242429',
            marginX: 4,
            width: '50%',
            borderRadius: 4
          }}
        >
          <Table

            sx={{
              backgroundImage: 'linear-gradient(90deg, #4b134f 0%, #c94b4b 90%)',
              borderRadius: 4
            }}
          >
            <TableBody>
              <TableRow>
                <TableCell sx={getDec}>UID</TableCell>
                <TableCell sx={getDec}>{`${data['id']}`}</TableCell>
              </TableRow>
              <TableRow>
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
    <CardActions
      className={classes.opaqueBack}
    >
      <Grid container
        justifyContent={'space-between'}
        alignItems={'center'}
        direction={'row'}>
        <Grid item>
          {!hFlag
            ? <IconButton
              variant='outlined'
              title='show status'
              onClick={() => {
                if (isPending != true) {
                  setOpen(true)
                  setOpenPolls(true)
                  dispatch(handleSnackBar('updating details'))
                  dispatch(getPollDetailsThunk(JSON.stringify({ '_email': cData[1] })))
                }
                setHFlag(true)
              }}
            ><SyncAltOutlined sx={getIconDec}></SyncAltOutlined>
            </IconButton>
            : isPending
              ? <CircularProgress size={'2rem'} sx={{
                color: 'text.light'
              }} />
              : <IconButton
                title='show my polls'
                sx={getIconDec}
                onClick={() => {
                  setHFlag(false)
                  dispatch(handleToPolls(true))

                }}
              ><ArrowForwardIosOutlined sx={getIconDec} />

              </IconButton>
          }

        </Grid>
      </Grid>
      <IconButton
        title={open ? 'create poll' : 'close'}
        onClick={() => {
          if (!isPending) {
            setOpenPolls(true)
            dispatch(resetPollRegStatus())
            open && dispatch(handleSnackBar('Create a Poll, by filling necessary details'))
            handleClick()
            setHFlag(false)

          }
        }}
      >{open ? <Create sx={getIconDec} /> : <Clear sx={getIconDec}></Clear>}</IconButton>
      <IconButton
        title={openPolls ? 'polls' : 'close'}
        onClick={() => {
          if (!isPending) {
            openPolls && dispatch(handleSnackBar('fetching your polls'))
            setOpen(true)
            handleOpenPolls()
            setHFlag(false)

          }
        }}
      >{openPolls ? <PollOutlined sx={getIconDec} /> : <Clear sx={getIconDec} />}</IconButton>
    </CardActions>
  </Card>

  return (
    <Box
      pt={10}
      mb={4}
      sx={{
        backgroundColor: 'transparent',
        width: 1300
      }}>


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