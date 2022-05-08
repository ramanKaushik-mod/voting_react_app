import { Dashboard, DashboardOutlined, HomeOutlined, PollOutlined, PollRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Grid, TextField, Typography, Slide } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignIn from '../../features/authentication/signIn'
import SignUp from '../../features/authentication/signUp'
import { getDashViewSelector, handleForgotPassTurnedOn, handleToPolls, handleSnackBar, getSnackBar, isSignedInSelector, logOut, resetAuthStatus, resetOptionalEmail, resetRegStatus, setDashView, resetProgressForPID } from '../../features/mainSlice'
import VerticalLinearStepper from '../../features/Utility/forDashBoard2'
import { TYPE_1, TYPE_2, TYPE_3, TYPE_4, VOTING_MOTIVE } from '../constants'
import DashBoard from '../dashBoard'
import { GetBoxNew } from './getBox'
import '../../App.css'
import { Snackbar } from '@mui/material'



function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

function Home() {
  const sbFlag = useSelector(getSnackBar)
  const [transition, setTransition] = React.useState(undefined);

  const dashView = useSelector(getDashViewSelector)
  const isSignedIn = useSelector(isSignedInSelector)
  const dispatch = useDispatch()
  const [ndviewText, setNDVIEWText] = useState('')

  // H E L P E R S

  const gridTypo = (content, p, fs, code) => <Grid item px={p} sx={code === 'm' ? {
    width: '100%'
  } : {}}>
    <Typography
      variant='h6'
      fontSize={fs !== null ? fs : 13}
      fontWeight={400}
      color={'text.light'}
    >
      {content}
    </Typography>
  </Grid>

  const typeCharacter = (character, color) => {
    return <Typography
      variant='h1'
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
    pt={10}
    bgcolor={'background.light'}
  >
    <Grid item
      px={5}
      sx={{
        width: '50%',
      }}>
      <Box>
        <Typography
          mb={4}
          color={'text.white'} variant={'h1'}> Every Vote Counts </Typography>
        <Box
          p={2}
          bgcolor={'background.purple'}
        >
          <Typography
            variant='h6'
            fontWeight={300}
            fontSize={17}
            color={'text.white'}>
            {`${VOTING_MOTIVE}`}</Typography></Box></Box>
      <Box>
        <Grid container
          pt={4}
          justifyContent={'left'}
          alignItems={'center'}
          direction='row'>
          <Grid item>
            <Box
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
                  backgroundColor: 'text.light',
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
            variant='outlined'
            sx={{
              marginLeft: 4,
              color: 'text.light',
              borderColor: 'text.light'
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
      </Box>
    </Grid>
    <Grid item
      p={5}
      sx={{
        width: '50%',
        backgroundColor: 'background.cardBackground'
      }}
    >
      <Card

        sx={{
          width: '100%',
          height: '20%',
          backgroundColor: 'black',
        }}
      >
        <CardHeader
        
          sx={{
            color: 'text.light',
          }}
          title="Choose A better platform. Avoid Lines & old ways"
        >

        </CardHeader>

        <CardMedia
          component="img"
          sx={{
            height: '40%'
          }}
          image={require('./forVRA.webp')}
        />
        <CardContent
          sx={{
            color: 'white',
            width:'100%'
          }}>
          <Typography gutterBottom variant="h5" component="div">
            Vote for a better future
          </Typography>
          <Grid container
          direction={'column'}
            sx={{
              width:'100%'
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
  </Grid>


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
      <Grid
        container
        sx={{
          width: '100%',
          backgroundColor: 'background.cardBackground'
        }}
      >
        <Grid item container
          pt={10}
          px={5}
          pb={1}
          direction='row'
        >
          {typeCharacter('B', 'text.light')}
          {typeCharacter('B', 'text.light')}
          {typeCharacter('-', 'text.light')}
          {typeCharacter('V', 'yellow')}
          {typeCharacter('S', 'white')}
        </Grid>
        <Grid item container
          mb={4}
          px={6}
          sx={{
            width: '100%'
          }}
        >
          <Card

            sx={{
              backgroundColor: 'background.black',
              paddingRight: 5
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
      </Grid>
      <VerticalLinearStepper />

    </Grid>}
  </Grid >


  return (<Grid container
    justifyContent={'center'}
    bgcolor={'background.main'}
  >

    {!isSignedIn && <Grid item>
      <GetBoxNew content={subWrapper}>
      </GetBoxNew>

    </Grid>}

    {isSignedIn && <Grid item>
      <GetBoxNew content={<DashBoard />}></GetBoxNew>
    </Grid>}
    <Grid item
      container
      component={'footer'}
      p={1}
      bgcolor={'background.light'}

      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0
      }}
    >

      {gridTypo('© 2022 BB-VS, Inc.', 3, 13)}
      {gridTypo('terms', 1, 13)}
      {gridTypo('privacy', 1, 13)}

    </Grid>

    <Grid
      container
      position={'fixed'}
      justifyContent={'space-between'}
      alignItems={'center'}
      direction='row'
      padding={3}
      bgcolor={'background.light'}
      color={'text.light'}
    >

      <Grid item>
        <Box>
          <Grid container
          >
            <PollOutlined fontSize='large' sx={{
              color: 'red'
            }} ></PollOutlined>

            {!isSignedIn ? <Button
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

          </Grid>
        </Box>
      </Grid>
      <Grid item
      >{!isSignedIn && <Box>
        <Button
          sx={{
            paddingX: 3,
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
          <Button
            variant='outlined'
            sx={{
              color: 'text.light',
              borderColor: 'text.light'
            }}
            onClick={() => {
              dispatch(resetProgressForPID())
              dispatch(handleToPolls(false))
              dispatch(setDashView({ dash: 0, optionalEmail: null }))
              dispatch(resetAuthStatus())
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


  )
}

export default Home