

import { Avatar, Card, Grid, Paper, Typography, TextField, CardMedia, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Checkbox, LinearProgress, Box, CardContent, CardHeader, CardActions, IconButton, Tooltip } from '@mui/material'
import { React, useState } from 'react'
import GetBox, { GetBoxNew2 } from '../../components/layout-components/getBox'
import { useDispatch, useSelector } from 'react-redux'
import { addCreatorThunk, addVoterThunk, resetRegStatus, resetStateAfterSignInClick, setDashView } from '../mainSlice'

import { selectRegStatus, selectRegSuccess, selectIsPending } from '../mainSlice'
import { useNavigate } from 'react-router-dom'
import { getTextField } from '../Utility/utility'
import { borderColor, borderRadius, height } from '@mui/system'
import { VOTING_MOTIVE } from '../../components/constants'
import { Login } from '@mui/icons-material'

function SignUp() {
  const regStatus = useSelector(selectRegStatus)
  const regSuccess = useSelector(selectRegSuccess)
  const isPending = useSelector(selectIsPending)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [person, setValue] = useState('v')
  const [name, updateName] = useState("")
  const [email, updateEmail] = useState("")
  const [password, updatePass] = useState("")
  const [contact, updateContact] = useState("")
  const [cPassword, updateCPass] = useState("")
  const [ageFlag, setAgeFlag] = useState(false)


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

  const signUpForm =
    <Grid component={'form'} container
      justifyContent={'center'}
      alignItems={'center'}
      direction={"column"}
      mt={1}
      mb={2}
      sx={{
        backgroundColor: '#0d102a',
        width: '100%',
        borderRadius: 2
      }}>
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
            Sign Up
          </Typography>
          <FormControl>
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
          </FormControl></Grid>
        <Grid item container justifyContent={'center'} alignItems={'center'} direction={'row'}
          sx={{
            width: '100%',
          }}
        >
          <Grid item>
            {textFieldInfo.map((item) => <Grid pt={1} item width={300} key={item.key}>{
              getTextField(item.label, item.ph, item.ip, item.key, item.handler)}</Grid>)}</Grid>
          {regStatus !== 0 && <Grid item
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
                title="Sign-Up STATUS">

              </CardHeader>
              <CardContent
                sx={{
                  backgroundColor: '#0d102a',
                  color: '#f2f2f2'
                }}
              >

                {regStatus === 200 && "Registration Successfull, You can sign-in now"}
                {regStatus === 198 && "No need to register, Email already exists, you can sign-in now"}
                {regStatus === 404 && "Something went wrong"}
              </CardContent>
              {regStatus !== 404 && <CardActions
                sx={{
                  backgroundColor: "black"
                }}
              > <Tooltip title={'Sign In'}><IconButton
                onClick={() => {
                  dispatch(resetRegStatus())
                  dispatch(setDashView(1))
                }}
              ><Login sx={{ color: 'red' }} /></IconButton></Tooltip>
              </CardActions>}
            </Card>
          </Grid>
          }
        </Grid>
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
        <Grid container item
          sx={{
            width: "100%"
          }}
          justifyContent={'center'}
        >
          {!isPending ?
            <Button
              onClick={() => {
                if (ageFlag && password === cPassword && password.length >= 1) {

                  let data = {
                    "_password": password,
                    "_name": name,
                    "_contact": contact,
                    "_email": email
                  }

                  if (person === 'c') {
                    dispatch(addCreatorThunk(JSON.stringify(data)))
                  } else {
                    dispatch(addVoterThunk(JSON.stringify(data)))
                  }
                }
              }}
              sx={{
                marginTop: 1
              }} type='submit'>submit</Button> : <LinearProgress
              sx={{
                width: 200,
                margin: 2.5
              }} />}
        </Grid>
      </Grid>
    </Grid>

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
      pt={11}
      sx={{
        width: '100%',
        backgroundColor: '#0d102f'
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