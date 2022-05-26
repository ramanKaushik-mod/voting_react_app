import { Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, FormControlLabel, Grid, IconButton, LinearProgress, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import { getTextField } from '../Utility/utility'
import GetBox, { GetBoxNew2 } from '../../components/layout-components/getBox'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCreatorThunk,
  getForgotPassTurnedOn,
  getVoterThunk,
  handleForgotPassTurnedOn,
  selectAuthStatus,
  getForgotPassStatus,
  getForgotPassPending,
  selectIsPending, forgotCPassTHUNK, forgotVPassTHUNK, handleSnackBar
} from '../mainSlice'
import { AppRegistrationRounded, ArrowBackIos, Login, LoginRounded, ResetTvRounded } from '@mui/icons-material'
import { logIn, resetAuthStatus, setDashView } from '../mainSlice'

function SignIn() {

  const isPending = useSelector(selectIsPending)
  const authStatus = useSelector(selectAuthStatus)
  const forgotPassTurnedOn = useSelector(getForgotPassTurnedOn)
  const fPending = useSelector(getForgotPassPending)
  const fStatus = useSelector(getForgotPassStatus)

  const dispatch = useDispatch()

  const [email, updateEmail] = useState("")
  const [password, updatePass] = useState("")
  const [person, setValue] = useState(null)
  const [uid, setUID] = useState('')



  const emailHandler = (e) => {
    updateEmail(e.target.value)
  }


  const passHandler = (e) => {
    updatePass(e.target.value)
  }

  const idHandler = (e) => {
    setUID(e.target.value)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const textFieldInfo = [
    {
      "key": 0,
      "label": "Email",
      "ph": "xxxxxxxx@domain.com",
      "ip": { inputMode: 'email', pattern: /([a-z A-Z])+([0-9])*\@([a-z])+\.(com)/ },
      "handler": emailHandler,
      c: ''
    }, {
      "key": 2,
      "label": "Password",
      "ph": "xxxxxxxx",
      "ip": { inputMode: 'password', pattern: /w+/ },
      "handler": passHandler
    }
  ]

  const forgotPassTextFields = [
    {
      "key": 0,
      "label": "Email",
      "ph": "xxxxxxxx@domain.com",
      "ip": { inputMode: 'email', pattern: '([a-z A-Z])+([0-9])*\@([a-z])+\.(com)' },
      "handler": emailHandler,
      c: ''
    },
    {
      "key": 1,
      "label": "UID",
      "ph": "Enter your UID",
      "ip": { inputMode: 'number', pattern: /w+/ },
      "handler": idHandler,
      c: ''
    }, {
      "key": 2,
      "label": "New Password",
      "ph": "xxxxxxxx",
      "ip": { inputMode: 'password', pattern: /w+/ },
      "handler": passHandler
    }
  ]

  const signInForm = <Card
  elevation={10}
    sx={{
      backgroundColor: 'background.cardBackground',
    }}
  >
    <CardHeader
      sx={{
        color: 'text.light',
        backgroundColor: 'background.cardBackground',
      }}
      title={!forgotPassTurnedOn ? 'BB-VS (Sign In)' : 'BB-VS Update passcode'}
    >


    </CardHeader>

    <CardContent
      sx={{
        backgroundColor: 'background.cardBackground'
      }}
    >
      <Grid item container justifyContent={'center'} alignItems={'center'} direction={'row'}
        sx={{
          width: '100%',
        }}
      >
        <Grid item>

          {!forgotPassTurnedOn && textFieldInfo.map((item) => <Grid pt={1} item width={300} key={item.key}>{
            getTextField(item.label, item.ph, item.ip, item.key, item.handler)}</Grid>)}
          {forgotPassTurnedOn && forgotPassTextFields.map((item) => <Grid pt={1} item width={300} key={item.key}>{
            getTextField(item.label, item.ph, item.ip, item.key, item.handler)}</Grid>)}
        </Grid>
        {(authStatus !== 0 || fStatus !== 0) && <Grid item
          ml={2}
          sx={{
            width: '30%',
          }}>
          <Card
          elevation={10}
            sx={{
              backgroundColor: 'background.cardBackground',
              borderRadius: 2
            }}
          >
            <CardHeader
              sx={{
                color: 'text.light',
              }}
              title="Authentication STATUS">

            </CardHeader>
            <CardContent
              sx={{
                backgroundColor: 'background.cardBackground',
                color: 'text.light'
              }}
            >
              {authStatus === 151 && "Wrong password, if forgotten - reset it now"}
              {authStatus === 190 && "No account registered with this email, Create a new one."}
              {authStatus === 404 && "Something went wrong"}
              {fStatus === 190 && forgotPassTurnedOn && 'Invalid Information, Create a new account.'}
              {fStatus === 200 && forgotPassTurnedOn && 'Your password has been resetted now, you can sign in.'}
            </CardContent>
            {authStatus === 151 && <CardActions
              sx={{
                backgroundColor: 'background.light'
              }}
            >
              <IconButton
                title='reset password'
                onClick={() => {
                  dispatch(resetAuthStatus())
                  handleForgotPassTurnedOn(true)
                }}
              ><ResetTvRounded sx={{ color: 'red' }} /></IconButton>
            </CardActions
            >

            }{authStatus === 190 && <CardActions
              sx={{
                backgroundColor: "background.black"
              }}
            >
              <IconButton
                title='Sign up'
                onClick={() => {
                  dispatch(resetAuthStatus())
                  dispatch(setDashView({ dash: 2, optionalEmail: null }))
                }}
              ><AppRegistrationRounded sx={{ color: 'red' }} /></IconButton>
            </CardActions>

            }
            {fStatus === 190 && forgotPassTurnedOn && <CardActions
              sx={{
                backgroundColor: "background.black"
              }}
            >
              <IconButton
                title='Sign up'
                onClick={() => {
                  dispatch(resetAuthStatus())
                  dispatch(handleForgotPassTurnedOn(false))
                  dispatch(setDashView({ dash: 2, optionalEmail: null }))
                }}
              ><AppRegistrationRounded sx={{ color: 'red' }} /></IconButton>
            </CardActions>

            }
            {fStatus === 200 && forgotPassTurnedOn && <CardActions
              sx={{
                backgroundColor: "background.black"
              }}
            >
              <IconButton
                title='Sign in now'
                onClick={() => {
                  dispatch(resetAuthStatus())
                  dispatch(handleForgotPassTurnedOn(false))
                }}
              ><LoginRounded sx={{ color: 'red' }} /></IconButton>
            </CardActions>

            }
          </Card>
        </Grid>
        }

      </Grid>
    </CardContent>
    <CardActions
      sx={{
        color: 'text.white',
        backgroundColor: 'background.cardBackground'
      }}
    ><Grid container
      justifyContent={'center'}
      alignItems={'center'}
      direction={'row'}
    >
        <Grid item>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={person}
            onChange={handleChange}
          >
            <FormControlLabel sx={{
              backgroundColor: 'background.light',
              color: 'text.accent',
              borderRadius: 2,
              paddingRight: 2
            }} value="c" control={<Radio sx={{
              color: 'background.radio',
            }} />} label="Creator" />

            <FormControlLabel value="v" control={<Radio sx={{
              color: 'background.radio',
            }} />} label="Voter" />
          </RadioGroup>
        </Grid>
        <Grid item>
          {forgotPassTurnedOn && <Button
            onClick={() => {
              dispatch(handleForgotPassTurnedOn(false))
              dispatch(resetAuthStatus())
            }}
            sx={{
              color: 'text.light',
              borderColor: 'text.light'
            }}
            variant={'outlined'}
          >
            <ArrowBackIos titleAccess='back to sign in page'></ArrowBackIos>
          </Button>}

          {!forgotPassTurnedOn && (!isPending ?
            <Button
              onClick={(e) => {

                if (`${email}`.search(/([a-z A-Z])+([0-9])*\@([a-z])+\.(com)/) === -1) {
                  dispatch(handleSnackBar('Enter a valid email address'))
                  return
                }
                if (password.length <= 5) {
                  dispatch(handleSnackBar('password must be 6 characters long'))
                  return
                }
                if(person === null){
                  dispatch(handleSnackBar('choose your type'))
                  return
                }

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
              bgcolor={'background.purple'}
              sx={{
                color: 'text.light',
                borderColor: 'text.light'
              }}
            >
              Authenticate my details
            </Button> : <LinearProgress sx={{
              width: 200,
              marginTop: 2
            }} />)}

        </Grid>
        <Grid item container
          justifyContent={'center'}
          my={2}
        >
          <Button
            disabled={isPending}
            variant='outlined'
            sx={{
              borderColor: 'background.radio',
              color: 'text.light',
              marginX: 3,

            }}
            onClick={() => {
              dispatch(resetAuthStatus())
              dispatch(handleForgotPassTurnedOn(true))
              if (forgotPassTurnedOn) {

                if (`${email}`.search(/([a-z A-Z])+([0-9])*\@([a-z])+\.(com)/) === -1) {
                  dispatch(handleSnackBar('Enter a valid email address'))
                  return
                }
                if(uid.length !== 8){
                  dispatch(handleSnackBar('Enter your 8 digit UID'))
                  return
                }
                if (password.length <= 5) {
                  dispatch(handleSnackBar('password must be 6 characters long'))
                  return
                }
                if(person === null){
                  dispatch(handleSnackBar('choose your type'))
                  return
                }
                if (person === 'c') {
                  dispatch(forgotCPassTHUNK(JSON.stringify({ _email: email, _id: uid, _newPasscode: password })))
                } else if (person === 'v') {
                  dispatch(forgotVPassTHUNK(JSON.stringify({ _email: email, _id: uid, _newPasscode: password })))
                }
              }
            }}
          >
            {!forgotPassTurnedOn ? 'Forgot Password ?' : (!fPending ? 'Reset Password' : <LinearProgress sx={{
              position: 'relative',
              width: 200,
            }} />)}
          </Button>
        </Grid>
      </Grid>
    </CardActions></Card>

  return (
    <Box
      mt={14}
      sx={{
        width: '100%',
        backgroundColor: 'background.cardBackground'
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