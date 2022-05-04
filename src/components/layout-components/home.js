import { Dashboard, DashboardOutlined, HomeOutlined, PollRounded } from '@mui/icons-material'
import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SignIn from '../../features/authentication/signIn'
import SignUp from '../../features/authentication/signUp'
import { getDashViewSelector, handleToPolls, isSignedInSelector, logOut, resetAuthStatus, resetRegStatus, setDashView } from '../../features/mainSlice'
import VerticalLinearStepper from '../../features/Utility/forDashBoard2'
import { VOTING_MOTIVE } from '../constants'
import DashBoard from '../dashBoard'
import { GetBoxNew } from './getBox'


function Home() {

  const dashView = useSelector(getDashViewSelector)
  const isSignedIn = useSelector(isSignedInSelector)
  const dispatch = useDispatch()
  const [ndviewText, setNDVIEWText] = useState('')

  // H E L P E R S

  const gridTypo = (content, p) => <Grid item px={p}>
    <Typography
      variant='h6'
      fontSize={13}
      fontWeight={200}
      color={'white'}
    >
      {content}
    </Typography>
  </Grid>

  const dashNormal = <Grid item>
    <Box
      pt={10}
      mb={10}
      sx={{
        height: '500px',
        width: '100%',
      }}
    >
      <Grid container >
        <Grid item
          p={5}
          sx={{
            width: '50%',
            backgroundColor: '#0d102f'
          }}>
          <Box>
            <Typography
              color={'white'} variant={'h1'}> Every Vote Counts </Typography>
            <Typography
              variant='h6'
              fontWeight={100}
              fontSize={20}
              color={'white'}>
              {`${VOTING_MOTIVE}`}</Typography></Box>
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
                      backgroundColor: 'black',
                      cursor: 4,
                      borderRadius: 2
                    }}
                    fullWidth />
                </Box>
              </Grid>
              <Grid item> <Button
                variant='outlined'
                sx={{
                  marginLeft: 4
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
            backgroundColor: '#0d102f'
          }}
        >
          <Card

            sx={{
              width: '100%',
              height: '84%',
              backgroundColor: 'black'
            }}
          >
            <CardHeader
              sx={{
                color: 'white',
              }}
              title="Choose A better platform. Avoid Lines & old ways"
            >

            </CardHeader>

            <CardMedia
              component="img"
              sx={{
                height: '60%'
              }}
              image={require('./forVRA.webp')}
            />
            <CardContent
              sx={{
                color: 'white',
              }}>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </Card>

        </Grid>
      </Grid>
    </Box>
  </Grid>


  const subWrapper = <Grid
    container
    sx={{
      backgroundColor: '#0d102f'
    }}
    minWidth={1200}
    justifyContent={'center'}
    alignItems={'center'}>

    {dashView === 0 && dashNormal}
    {dashView === 1 && <SignIn></SignIn>}
    {dashView === 2 && <SignUp></SignUp>}
    <Grid item container
    >

      <VerticalLinearStepper />

    </Grid>
  </Grid>


  return (<Grid container
    justifyContent={'center'}
    mb={7}
    style={{
      backgroundColor: '#0d102f'

    }}>
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
      sx={{
        backgroundColor: 'black',
        width: '100%',
        position:'fixed',
        bottom:0,
        left:0
      }}
    >

      {gridTypo('© 2022 BB-VS, Inc.', 3)}
      {gridTypo('terms', 1)}
      {gridTypo('privacy', 1)}

    </Grid>

    <Grid
      container
      position={'fixed'}
      justifyContent={'space-between'}
      alignItems={'center'}
      direction='row'
      padding={3}
      style={{
        backgroundColor: 'black'
      }}
    >

      <Grid item>
        <Box>
        <Grid container
          >
            <PollRounded fontSize='large' sx={{
              color: 'red'
            }} ></PollRounded>

            {!isSignedIn ?<Button
              onClick={() => {
                dispatch(setDashView(0))
              }}
              endIcon={<HomeOutlined />}
            >
              Home
            </Button>

            :<Button
              onClick={() => {
                dispatch(handleToPolls(false))
              }}
              endIcon={<DashboardOutlined />}
            >
              Dashboard
            </Button>}

          </Grid>
        </Box>
      </Grid>
      <Grid item
      >{!isSignedIn && <Box>
        <Button
          sx={{
            paddingX: 3
          }}
          onClick={() => {
            dispatch(resetAuthStatus())
            dispatch(setDashView(1))
          }}
        >
          Sign In
        </Button>
        <Button
          variant='outlined'
          onClick={() => {
            dispatch(resetRegStatus())
            dispatch(resetAuthStatus())
            dispatch(setDashView(2))
          }}
        >
          Sign Up
        </Button>
      </Box>}
        {isSignedIn && <Box>
          <Button
          variant='outlined'
            sx={{
              paddingX: 3
            }}
            onClick={() => {
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