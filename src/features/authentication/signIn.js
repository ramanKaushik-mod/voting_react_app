import { Box, Button, Card, CardActions, CardContent, CardHeader, FormControlLabel, Grid, IconButton, LinearProgress, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { getTextField } from '../Utility/utility'
import GetBox, { GetBoxNew2 } from '../../components/layout-components/getBox'
import { useDispatch, useSelector } from 'react-redux'
import { getCreatorThunk, getVoterThunk, selectAuthStatus, selectCreatorData, selectIsPending, selectVoterData } from '../mainSlice'
import { useNavigate } from 'react-router-dom'
import { getPollDetailsThunk } from '../pollSlice'
import { AppRegistrationRounded, Login, LoginRounded, ResetTvRounded } from '@mui/icons-material'
import { Tooltip } from 'chart.js'
import { logIn, resetAuthStatus, setDashView } from '../mainSlice'

function SignIn() {

  const isPending = useSelector(selectIsPending)
  const authStatus = useSelector(selectAuthStatus)
  const vData = useSelector(selectVoterData)
  const cData = useSelector(selectCreatorData)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, updateEmail] = useState("")
  const [password, updatePass] = useState("")
  const [person, setValue] = useState(null)



  const emailHandler = (e) => {
    updateEmail(e.target.value)
  }


  const passHandler = (e) => {
    updatePass(e.target.value)
  }


  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const textFieldInfo = [
    {
      "key": 0,
      "label": "Email",
      "ph": "xxxxxxxx@domain.com",
      "ip": { inputMode: 'email', pattern: /\w+@+\w+\.+[a-z]/ },
      "handler": emailHandler,
      c: ''
    }, {
      "key": 3,
      "label": "Password",
      "ph": "xxxxxxxx",
      "ip": { inputMode: 'password', pattern: '' },
      "handler": passHandler
    }
  ]
  const signInForm = <Grid component={'form'} container
    justifyContent={'center'}
    alignItems={'center'}
    direction={"column"}
    mt={1}
    mb={2}
    sx={{
      backgroundColor: '#0d102a',
      width: '100%',
      borderRadius: 2
    }}
  >
    <Grid item container
      justifyContent={'center'}
      spacing={1} direction={'column'} p={4}>
      <Grid item>
        <Typography
          variant={'h4'}
          sx={{
            marginBottom: 2,
            marginRight: 1,
            color: '#952532'
          }}
        >
          Sign In
        </Typography>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={person}
          onChange={handleChange}
        >
          <FormControlLabel value="c" control={<Radio />} label="Creator" />
          <FormControlLabel value="v" control={<Radio />} label="Voter" />
        </RadioGroup>
      </Grid>
      <Grid item container justifyContent={'center'} alignItems={'center'} direction={'row'}
        sx={{
          width: '100%',
        }}
      >
        <Grid item>
          {textFieldInfo.map((item) => <Grid pt={1} item width={300} key={item.key}>{
            getTextField(item.label, item.ph, item.ip, item.key, item.handler)}</Grid>)}
        </Grid>
        {authStatus !== 0 && <Grid item
          ml={2}
          sx={{
            width: '30%',
          }}>
          <Card
            sx={{
              backgroundColor: 'black',
            }}
          >
            <CardHeader
              sx={{
                color: 'white',
                backgroundColor: 'black',
              }}
              title="Authentication STATUS">

            </CardHeader>
            <CardContent
              sx={{
                backgroundColor: '#0d102a',
                color: '#f2f2f2'
              }}
            >

              {authStatus === 151&& "Wrong password, if forgotten - reset it now"}
              {authStatus === 190 && "No account registered with this email, Create a new one."}
              {authStatus === 404 && "Something went wrong"}
            </CardContent>
            {authStatus === 151 && <CardActions
              sx={{
                backgroundColor: "black"
              }}
            >
                <IconButton
                title='reset password'
                  onClick={() => {
                    dispatch(resetAuthStatus())
                    dispatch(setDashView(0))
                  }}
                ><ResetTvRounded sx={{ color: 'red' }} /></IconButton>
            </CardActions>

            }{authStatus === 190 && <CardActions
              sx={{
                backgroundColor: "black"
              }}
            >
                <IconButton
                title='Sign up'
                  onClick={() => {
                    dispatch(resetAuthStatus())
                    dispatch(setDashView(2))
                  }}
                ><AppRegistrationRounded sx={{ color: 'red' }} /></IconButton>
            </CardActions>

            }
          </Card>
        </Grid>
        }

      </Grid>
      <Grid container item
        sx={{
          width: "100%"
        }}
        justifyContent={'center'}>
        {!isPending ?
          <Button

            onClick={(e) => {
              e.preventDefault()
              let data = {
                "_password": password,
                "_email": email
              }
              if (person === 'c') {
                dispatch(getCreatorThunk(JSON.stringify(data)))
              } else if (person === 'v') {
                dispatch(getVoterThunk(JSON.stringify(data)))
              }

              // user has logged in or not
            }}
            type="submit"
            variant='outlined'
            sx={{
              marginTop: 3,
            }}
          >
            Authenticate my details
          </Button> : <LinearProgress sx={{
            width: 200,
            marginTop: 2
          }} />}
      </Grid>
    </Grid>
  </Grid>
  return (
    <Box
      pt={11}
      sx={{
        width: '100%',
        backgroundColor: '#0d102f'
      }}>
      <Grid container
        sx={{
          width: "100%"
        }}>
        {<GetBoxNew2 content={signInForm}></GetBoxNew2>
        }
      </Grid>

    </Box>
  )
}

export default SignIn