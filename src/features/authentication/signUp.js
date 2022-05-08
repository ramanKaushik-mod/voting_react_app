

import { Avatar, Card, Grid, Paper, Typography, TextField, CardMedia, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, LinearProgress, Box, CardContent, CardHeader, CardActions, IconButton, Tooltip } from '@mui/material'
import { React, useState } from 'react'
import GetBox, { GetBoxNew2 } from '../../components/layout-components/getBox'
import { useDispatch, useSelector } from 'react-redux'
import { addCreatorThunk, addVoterThunk, getOptionalEmail, resetRegStatus, resetStateAfterSignInClick, setDashView } from '../mainSlice'

import { selectRegStatus, selectRegSuccess, selectIsPending } from '../mainSlice'
import { useNavigate } from 'react-router-dom'
import { getTextField } from '../Utility/utility'
import { Login } from '@mui/icons-material'

function SignUp() {
  const regStatus = useSelector(selectRegStatus)
  const regSuccess = useSelector(selectRegSuccess)
  const isPending = useSelector(selectIsPending)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [person, setValue] = useState(null)
  const [name, updateName] = useState("")
  const [email, updateEmail] = useState("")
  const [password, updatePass] = useState("")
  const [contact, updateContact] = useState("")
  const [cPassword, updateCPass] = useState("")
  const [ageFlag, setAgeFlag] = useState(false)
  const optionalEmail = useSelector(getOptionalEmail)

  const nameHandler = (e) => {
    updateName(e.target.value)
  }
  const emailHandler = (e) => {
    updateEmail(e.target.value)
  }
  const phHandler = (e) => {
    updateContact(e.target.value)
  }
  const passHandler = (e) => {
    updatePass(e.target.value)
  }
  const cpassHandler = (e) => {
    updateCPass(e.target.value)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }


  const textFieldInfo = [{
    "key": 0,
    "label": "Name",
    "ph": "Enter your Name",
    "ip": { inputMode: 'text', pattern: /\S\s\S/ },
    "handler": nameHandler
  }, {
    "key": 1,
    "label": "Email",
    "ph": "xxxxxxxx@domain.com",
    "ip": { inputMode: 'email', pattern: /\w+@+\w+\.+[a-z]/ },
    "handler": emailHandler
  }, {
    "key": 2,
    "label": "Contact",
    "ph": "xxxxxxxxxx",
    "ip": { inputMode: 'number', pattern: /[0-9]/ },
    "handler": phHandler
  }, {
    "key": 3,
    "label": "Password",
    "ph": "xxxxxxxx",
    "ip": { inputMode: 'password', pattern: '' },
    "handler": passHandler
  }, {
    "key": 4,
    "label": "Confirm Password",
    "ph": "xxxxxxxx",
    "ip": { inputMode: 'password', pattern: '' },
    "handler": cpassHandler
  },]

  const signUpForm = <Card
    sx={{
      backgroundColor: 'background.cardBackground',
      paddingBottom:5
    }}>

    <CardHeader
      sx={{
        color: 'text.light',
        backgroundColor: 'background.cardBackground',
      }}
      title={'BB-VS (Sign Up)'}>
    </CardHeader>
    <CardContent>

      <Grid item container justifyContent={'center'} alignItems={'center'} direction={'row'}
        sx={{
          width: '100%',
        }}
      >
        <Grid item>
          {textFieldInfo.map((item) => <Grid pt={1} item width={300} key={item.key}>{
            item.key === 1 && optionalEmail !== null
              ? getTextField(item.label, item.ph, item.ip, item.key, item.handler, optionalEmail)
              : getTextField(item.label, item.ph, item.ip, item.key, item.handler)}
          </Grid>)}</Grid>
        {regStatus !== 0 && <Grid item
          ml={2}
          sx={{
            width: '30%',
          }}>
          <Card
            sx={{
              backgroundColor: 'background.main',
              borderRadius: 2
            }}
          >
            <CardHeader
              sx={{
                color: 'text.light',
              }}
              title="Sign-Up STATUS">

            </CardHeader>
            <CardContent
              sx={{
                backgroundColor: 'background.main',
                color: 'text.purple'
              }}
            >

              {regStatus === 200 && "Registration Successfull, You can sign-in now"}
              {regStatus === 198 && "No need to register, Email already exists, you can sign-in now"}
              {regStatus === 404 && "Something went wrong"}
            </CardContent>
            {regStatus !== 404 && <CardActions
              sx={{
                backgroundColor: 'background.light'
              }}
            > <Tooltip title={'Sign In'}><IconButton
              onClick={() => {
                dispatch(resetRegStatus())
                dispatch(setDashView({ dash: 1, optionalEmail: null }))
              }}
            ><Login sx={{ color: 'red' }} /></IconButton></Tooltip>
            </CardActions>}
          </Card>
        </Grid>
        }
      </Grid>
    </CardContent>

    <CardActions
      sx={{
        color: 'text.white',
        backgroundColor: 'background.cardBackground'
      }}>
      <Grid container
        justifyContent={'center'}
        alignItems={'center'}
        direction={'row'}
      >
        <Grid item container justifyContent={'center'} alignItems={'center'}>
          <Grid item >
            <Typography
            >
              I am above 18
            </Typography>
          </Grid>
          <Checkbox
            required={true}
            onChange={(e) => {
              setAgeFlag(e.target.checked)
            }}
          />
        </Grid>
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
              color: 'text.light',
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
        <Grid item container
          justifyContent={'center'}
          mt={1}
        >

          {!isPending ?
            <Button

              onClick={() => {

                if (ageFlag && password === cPassword && password.length >= 4) {

                  let data = {
                    "_password": password,
                    "_name": name,
                    "_contact": contact,
                    "_email": email === null ? optionalEmail : email
                  }

                  if (person === 'c') {
                    dispatch(addCreatorThunk(JSON.stringify(data)))
                  } else {
                    dispatch(addVoterThunk(JSON.stringify(data)))
                  }
                }
              }}
              variant='outlined'
              sx={{
                color: 'text.light',
                borderColor: 'text.light'
              }} type='submit'>submit</Button> : <LinearProgress
              sx={{
                width: 200,
                margin: 2.5
              }} />}
        </Grid>

      </Grid>

    </CardActions>
  </Card>

  const onSuccessView = <Grid
    container
    justifyContent={'center'}
    alignItems={'center'}
    direction={'column'}
  >
    <Grid item>
      <Typography>
        {regStatus === 200
          ? 'Registration Successfull'
          : regStatus === 198
            ? `${person === 'c' ? 'creator' : 'voter'} already exist, Try with new ID`
            : regStatus === 404
              ? 'Server Error'
              : ''}
      </Typography>
    </Grid>
    <Grid container
      item
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Typography>
        You can
      </Typography>
      <Button
        type='submit'
        onClick={
          () => {
            if (regStatus === 200) {
              navigate('/signIn')
            }
          }
        }
      >
        {regStatus === 200 ? 'Sign In' : 'Sign Up'}
      </Button>

      <Typography>
        now.
      </Typography>
    </Grid>
  </Grid>
  return (
    <Box
      pt={10}
      sx={{
        width: '100%',
        backgroundColor: 'background.main'
      }}>
      <Grid container
        sx={{
          width: "100%"
        }}
      ><GetBoxNew2 content={signUpForm}></GetBoxNew2>
      </Grid>

    </Box>
  )
}

export default SignUp