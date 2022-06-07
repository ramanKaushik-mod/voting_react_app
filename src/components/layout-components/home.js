import { ArrowBackIos, ArrowForwardIos, Clear, DashboardOutlined, HomeOutlined, PollOutlined } from '@mui/icons-material'
import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, IconButton, TextField, Typography, Avatar } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignIn from '../../features/authentication/signIn'
import SignUp from '../../features/authentication/signUp'
import { getDashViewSelector, handleForgotPassTurnedOn, handleToPolls, handleSnackBar, resetUserImgStatus, isSignedInSelector, logOut, resetAuthStatus, resetOptionalEmail, resetRegStatus, setDashView, resetProgressForPID, selectError, resetEverything, manageAfterSubscribe } from '../../features/mainSlice'
import VerticalLinearStepper from '../../features/Utility/forDashBoard2'
import { TYPE_1, TYPE_2, TYPE_3, TYPE_4, VOTING_MOTIVE } from '../constants'
import DashBoard from '../dashBoard'
import { GetBoxNew } from './getBox'
import '../../App.css'
import ShowSnackbar from '../../snackBar'
import { ThemeSwitch } from '../../features/Utility/utility'
import { useStyles } from '../../styles/styles'
import UView from '../uReview'



function Home() {
  const dashView = useSelector(getDashViewSelector)
  const isSignedIn = useSelector(isSignedInSelector)
  const error = useSelector(selectError)
  const dispatch = useDispatch()
  const [ndviewText, setNDVIEWText] = useState('')
  const classes = useStyles()
  const [ctrlABView, setCtrlABView] = useState(true)

  // H E L P E R S

  const gridTypo = (content, p, fs, code) => <Grid item px={p} sx={code === 'm' ? {
    width: '100%'
  } : {}}>
    <Typography
      variant='h6'
      fontSize={fs !== null ? fs : 13}
      fontWeight={400}
      color={'text.footer'}
    >
      {content}
    </Typography>
  </Grid>

  const typeCharacter = (character, color, variant) => {
    return <Typography
      variant={variant === null ? 'h1' : variant}
      color={color}
    >
      {character}
    </Typography>
  }

  const typo = (content) => <Typography
    color={'text.light'}
  >
    {content}
  </Typography>

  const dashNormal = <Grid container item
    justifyContent={'center'}
    alignItems={'center'}
    direction={'row'}
    pt={11}
    bgcolor={'transparent'}
  >
    <Grid item
      px={5}
      sx={{
        width: '50%',
      }}>
      <Box>
        <Typography
          mb={2}
          color={'text.accent'} variant={'h1'}> Every Vote Counts </Typography>
      </Box>
      <Card
        raised={true}
        elevation={10}
        sx={{
          backgroundColor: 'transparent',
          borderRadius: 4
        }}

      >
        <CardContent>
          <Box
            p={2}
          >
            <Typography
              variant='h6'
              fontWeight={300}
              fontSize={17}
              color={'text.light'}>
              {`${VOTING_MOTIVE}`}</Typography></Box>

        </CardContent>
        <CardActions
          className={classes.opaqueBack}
        >

          <Grid container
            justifyContent={'center'}
            alignItems={'center'}
            direction='row'>
            <Grid item>
              <Box
                justifyContent={'center'}
                sx={{
                  width: 300,
                  maxWidth: '100%',
                }}
              >
                <TextField

                  onChange={(e) => {
                    setNDVIEWText(e.target.value)
                  }}
                  sx={{
                    backgroundColor: 'background.purple',
                    borderRadius: 2,
                    cursor: 4,
                  }}
                  InputLabelProps={{
                    className: 'masterTextField'
                  }}
                  InputProps={{
                    className: 'masterTextField'
                  }}
                  fullWidth />
              </Box>
            </Grid>
            <Grid item> <Button
              variant='filled'
              sx={{
                marginLeft: 4,
                color: 'text.light',
                backgroundColor: 'background.button'
              }}
              onClick={() => {
                dispatch(resetRegStatus())
                dispatch(resetAuthStatus())
                if (ndviewText !== null) {
                  dispatch(setDashView({ 'dash': 2, 'optionalEmail': ndviewText }))
                } else {
                  dispatch(setDashView(2))
                }

              }}
            >
              Sign Up Now
            </Button>

            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
    <Grid item
      p={6}
      sx={{
        width: '50%',
        backgroundColor: 'transparent'
      }}
    >
      <Card
        elevation={10}
        sx={{
          backgroundColor: 'transparent',
          borderRadius: 4
        }}
      >
        <CardHeader
          sx={{
            color: 'yellow'
          }}
          title="Choose A better platform. Avoid Lines & old ways"
        >

        </CardHeader>

        <CardMedia
          component="img"
          sx={{
            height: 200
          }}
          image={require('./forVRA.webp')}
        />
        <CardContent
          sx={{
            backgroundImage: 'linear-gradient(95deg, #4b134f 0%, #c94b4b 100%)'

          }}
        >
          <Typography gutterBottom variant="h5" component="div" color={'yellow'}>
            Vote for a better future
          </Typography>
          <Grid container
            direction={'column'}
            sx={{
              width: '100%'
            }}
          >
            {gridTypo('Elections have consequences.', null, 16, null)}
            {gridTypo('Not voting is giving up your voice.', null, 16, null)}
            {gridTypo('Voting is an opportunity for change.', null, 16, null)}
            {gridTypo('The community depends on you!', null, 16, null)}
          </Grid>
        </CardContent>
      </Card>

    </Grid>
  </Grid >


  const subWrapper = <Grid
    width={1300}
    sx={{
      backgroundColor: 'transparent'
    }}
    justifyContent={'center'}
    alignItems={'center'}>
    {dashView === 0 && dashNormal}
    {dashView === 1 && <SignIn></SignIn>}
    {dashView === 2 && <SignUp></SignUp>}
    {dashView === 0 && <Grid item container
    >
      <Card
        elevation={10}
        sx={{
          bgcolor: 'transparent', borderRadius: 4,
          border: 1,
          borderColor: 'white',
        }}>
        <Grid
          container
          sx={{
            width: '100%',
            backgroundColor: 'transparent',
            borderRadius: 4
          }}
        >
          <Grid item container
            pt={6}
            px={5}
            pb={1}
            direction='row'
          >
            {typeCharacter('B', 'text.accent', null)}
            {typeCharacter('B', 'text.accent', null)}
            {typeCharacter('-', 'text.accent', null)}
            {typeCharacter('V', 'yellow', null)}
            {typeCharacter('S', 'text.accent', null)}
          </Grid>
          <Grid item container
            mb={4}
            px={6}
            sx={{
              width: '100%'
            }}
          >
            <Card
              elevation={10}
              sx={{
                backgroundColor: 'transparent',
                paddingRight: 5,
                borderRadius: 4
              }}
            >
              <CardContent> {gridTypo(TYPE_1, 0, 16, 'm')}
                {gridTypo(TYPE_2, 0, 16, 'm')}
                {gridTypo(TYPE_3, 0, 16, 'm')}
                {gridTypo(TYPE_4, 0, 16, 'm')}

              </CardContent>
            </Card>

            <Typography
              color={'text.light'}
              variant='h6'
              fontWeight={200}
            >

            </Typography>
          </Grid>
        </Grid></Card>
      <VerticalLinearStepper />
      <UView />
    </Grid>}
  </Grid >


  return (error ? <Grid container
    justifyContent={'center'}
    alignItems={'center'}
    direction={'row'}
    height={500}
    alignContent={'center'}
    color={'background.accent'}
    sx={classes.body}
    >
    <Grid item container
      justifyContent={'center'}
      p={2}
      m={1}
    >
      <Grid item><Typography
        color={'text.light'}
        variant={'h1'}
      >
        404
      </Typography></Grid>
      <Grid item>
        <Typography
          color={'text.light'}
          variant={'h6'}
        >
          page not found
        </Typography>
      </Grid>


    </Grid>
    {gridTypo('Connection Error')}
    <Grid item>
      <IconButton
        onClick={() => {
          dispatch(resetEverything())
        }}
      >
        <Clear color='error'></Clear>
      </IconButton>
    </Grid>
  </Grid> : <Grid container
    justifyContent={'center'}
    mt={2}
    bgcolor={'transparent'}
  >
    <ShowSnackbar></ShowSnackbar>
    {!isSignedIn && <Grid item>
      <GetBoxNew content={subWrapper}>
      </GetBoxNew>
    </Grid>}

    {isSignedIn && <Grid item>
      <GetBoxNew content={<DashBoard />}></GetBoxNew>
    </Grid>}
    <Grid item container
        position={'fixed'}
        justifyContent={'right'}
        alignItems={'center'}
        width={'95%'}>
    <Grid item
      container
      width={'26%'}
      justifyContent={'right'}
      alignItems={'center'}
      direction='row'
      px={3}
      py={2}
      mb={1}
      className={classes.appbar}
      sx={{
        position: 'fixed',
        bottom: 0,
      }}
    >

      {gridTypo('© 2022 BB-VS, Inc.', 3, 13)}
      {gridTypo('terms', 1, 13)}
      {gridTypo('privacy', 1, 13)}
      <Avatar
      sx={{
        height:30,
        width:30
      }}
      >

      </Avatar>

    </Grid></Grid>
    <Grid item container
        position={'fixed'}
        justifyContent={'left'}
        alignItems={'center'}
        width={'95%'}
    >
      <Grid item
      width={ctrlABView ? '100%' : '20%'}
        container
        justifyContent={'center'}
        alignItems={'left'}
        direction='row'
        px={3}
        py={2}
        className={classes.appbar}
      >
        <Grid item container
          position={'absolute'}
          justifyContent={'center'}
          direction='row'
          sx={{
            width: '10%'
          }}
          display={ctrlABView ? 'flex' : 'none'}
        >
          {typeCharacter('B', 'text.light', 'h4')}
          {typeCharacter('B', 'text.light', 'h4')}
          {typeCharacter('-', 'text.light', 'h4')}
          {typeCharacter('V', 'yellow', 'h4')}
          {typeCharacter('S', 'text.light', 'h4')}


        </Grid>
        <Grid item container
          sx={{
            width: '100%',
          }}
          justifyContent={'space-between'}
          alignItems={'center'}
          direction={'row'}>

          <Grid item
          >
            <Box>
              <Grid container
              >
                <PollOutlined fontSize='large' sx={{
                  color: 'red'
                }} ></PollOutlined>

                {!isSignedIn ?
                  <Button
                    onClick={() => {
                      dispatch(resetOptionalEmail())
                      dispatch(setDashView({ 'dash': 0, 'optionalEmail': ndviewText }))
                    }}
                    endIcon={<HomeOutlined sx={{
                      color: 'yellow'
                    }} />}
                  >
                    {typo('Home')}
                  </Button>

                  : <Button
                    onClick={() => {
                      dispatch(handleToPolls(false))
                    }}
                    endIcon={<DashboardOutlined sx={{
                      color: 'red'
                    }} />}
                  >
                    {typo('Dashboard')}
                  </Button>}
                <Box>
                  <IconButton
                    sx={{
                      color: 'yellow'
                    }}
                    onClick={() => {
                      setCtrlABView(!ctrlABView)
                    }}
                  >
                    {ctrlABView ? <ArrowBackIos fontSize='small'></ArrowBackIos> : <ArrowForwardIos fontSize='small'></ArrowForwardIos>}
                  </IconButton>
                </Box>
              </Grid>
            </Box>

          </Grid>

          <Grid item
            display={ctrlABView ? 'initial' : 'none'}
          >

            {!isSignedIn && <Box>
              {/* <ThemeSwitch></ThemeSwitch> */}
              <Button

                sx={{
                  paddingX: 2,
                  marginX: 1,
                  color: 'red'

                }}
                onClick={() => {
                  dispatch(handleForgotPassTurnedOn(false))

                  dispatch(resetOptionalEmail())
                  dispatch(resetAuthStatus())
                  dispatch(setDashView({ 'dash': 1, 'optionalEmail': null }))
                }}
              >
                Sign In
              </Button>
              <Button
                sx={{
                  color: 'text.light',
                  borderColor: 'text.light'
                }}
                variant='outlined'
                onClick={() => {
                  dispatch(resetOptionalEmail())
                  dispatch(resetRegStatus())
                  dispatch(resetAuthStatus())
                  dispatch(setDashView({ 'dash': 2, 'optionalEmail': null }))
                }}
              >
                Sign Up
              </Button>
            </Box>}
            {isSignedIn && <Box>

              {/* <ThemeSwitch></ThemeSwitch> */}
              <Button
                variant='outlined'
                sx={{
                  color: 'text.light',
                  borderColor: 'text.light'
                }}
                onClick={() => {
                  dispatch(handleSnackBar('world needs you'))
                  dispatch(resetProgressForPID())
                  dispatch(handleToPolls(false))
                  dispatch(setDashView({ dash: 0, optionalEmail: null }))
                  dispatch(resetAuthStatus())
                  dispatch(resetUserImgStatus())
                  dispatch(manageAfterSubscribe())
                  dispatch(logOut())
                }}
              >
                sign out
              </Button>

            </Box>
            }
          </Grid>
        </Grid>
      </Grid> 
      </Grid>
  </Grid>


  )
}

export default Home