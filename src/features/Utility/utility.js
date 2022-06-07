import { Add, ExpandLess, ExpandMore, KeyboardArrowDown, KeyboardArrowUp, KeyboardArrowUpOutlined, Person, Poll, Remove, Subscript, SubscriptionsRounded, SubscriptionsTwoTone, TableBar } from "@mui/icons-material"
import { TextField, Grid, Typography, TableContainer, Table, TableCell, TableRow, TableHead, TableBody, IconButton, Button, Tooltip, Collapse, LinearProgress, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Card, CardContent } from "@mui/material"
import GetBox, { GetBoxNew2 } from "../../components/layout-components/getBox"
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { currentPollId, getPollData, handleTheme, selectIsPending } from "../mainSlice"
import { Box, typographyVariant } from "@mui/system"
import { Chart as chartjs } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import { addVoterPIDS, manageAfterSubscribe } from "../mainSlice"
import '../../App.css'

import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { useStyles } from "../../styles/styles"


export const getTextField = (label, placeholder, ip, key, h, value, m) => {
  return <TextField
    value={value !== null ? value : null}
    required
    component={'div'}
    key={key}
    type={ip.inputMode}
    inputMode={ip}
    label={label}
    variant={"filled"}
    fullWidth={true}
    multiline={m}
    rows={4}
    sx={m === null ? {
      backgroundColor: "transparent",
      maxWidth: 340,
      color: 'text.light',
      accentColor: 'text.light'
    } : {
      backgroundColor: "transparent",
      color: 'text.light',
      accentColor: 'text.light'

    }}
    onChange={h}
    placeholder={placeholder}
    className={'textFieldColor'}

    InputLabelProps={{
      className: 'textFieldColor_label'
    }}
    InputProps={{
      className: 'textFieldColor_label'
    }}
  />
}


export const GetCandidateDetails = ({
  data
}) => {
  const getDec = {
    color: 'text.light'
  }
  const cpID = useSelector(currentPollId)

  const wrapper = <Card
    elevation={10}
    sx={{
      backgroundColor: 'transparent',
      borderRadius: 4
    }}
  >
    <TableContainer aria-label="collapsible table" sx={{
      backgroundColor: 'transparent'
    }}>
      <Table

        sx={{ width: '100%' }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={getDec} align='center'><Typography>
              Poll-ID : {!cpID ? '' : cpID}
            </Typography></TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={getDec}>S.NO.</TableCell>
            <TableCell sx={getDec} align="right">NAME</TableCell>
            <TableCell sx={getDec} align="right">MANIFESTO</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map(row => (
              <TableRow
                key={row.key}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={getDec} component="th" scope="row">
                  {row.key}
                </TableCell>
                <TableCell sx={getDec} align="right">{row.candidateName.toUpperCase()}</TableCell>
                <TableCell sx={getDec} align="right">{row.candidateManifest}</TableCell>

              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer></Card>

  return data.length > 1 && <GetBoxNew2 content={wrapper}></GetBoxNew2>

}


function Row({ row }) {
  const getDec = {
    color: '#f2f2f2'
  }

  const getIconDec = {
    color: 'red'
  }
  const [open, setOpen] = useState(false)

  const formatDate = (date) => {
    return `${new Date(date).getDate()}-${new Date(date).getMonth() + 1}-${new Date(date).getFullYear()}`
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            sx={getIconDec}
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell sx={getDec} component="th" scope="row">
          {row.pollId}
        </TableCell>
        <TableCell sx={getDec} align="right">{row.title}</TableCell>
        <TableCell sx={getDec} align="right">{formatDate(row.createdAt)}</TableCell>
        <TableCell sx={getDec} align="right">{formatDate(row.startdate)}</TableCell>
        <TableCell sx={getDec} align="right">{formatDate(row.enddate)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography sx={getDec} variant={'h6'} gutterBottom component={'div'}>
                Candidate-Detials
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell sx={getDec}>ID</TableCell>
                    <TableCell sx={getDec}>NAME</TableCell>
                    <TableCell sx={getDec} align="right">MANIFESTO</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.candidates.map((candidate) => (
                    <TableRow key={candidate.cID}>
                      <TableCell sx={getDec} component="th" scope="row">
                        {candidate.cID}
                      </TableCell>
                      <TableCell sx={getDec} >{candidate.cName}</TableCell>
                      <TableCell sx={getDec} align="right">{candidate.cManifesto}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}


export const GetPolls = () => {
  const classes = useStyles()
  const getDec = {
    color: 'text.light'
  }

  const pollData = useSelector(getPollData)
  const isPending = useSelector(selectIsPending)

  const wrapper =
    <Card
      elevation={10}
      sx={{
        backgroundColor: 'transparent',
        borderRadius: 4,
        padding: 2,
        marginTop: 2,
      }}
    >
      <TableContainer>
        <Table aria-label="collapsible table" sx={{
          backgroundImage: 'linear-gradientlinear-gradient(43deg, #4158D0 1%, #C850C0 46%, #FFCC70 100%)'
        }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell sx={getDec}>POLL ID</TableCell>
              <TableCell sx={getDec} align="right">TITLE</TableCell>
              <TableCell sx={getDec} align="right">DOC</TableCell>
              <TableCell sx={getDec} align="right">OPEN ON</TableCell>
              <TableCell sx={getDec} align="right">CLOSE ON</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pollData.map((row) => (
              <Row key={row.pollId} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer></Card>

  const onEmptyPollData = onEmptyShowMessage('you have not created any poll yet')
  return !isPending
    ? pollData.length !== 0
      ? <GetBoxNew2 content={wrapper}></GetBoxNew2>
      : <GetBoxNew2 content={onEmptyPollData}></GetBoxNew2>
    : <GetBoxNew2 content={<LinearProgress />}></GetBoxNew2>
}


const formatDate = (date) => {
  return `${new Date(date).getDate()}-${new Date(date).getMonth() + 1}-${new Date(date).getFullYear()}`
}


export function PollData({ deepInfo }) {
  const isActiveOrNot = (startDate, endDate) => {
    startDate = new Date(`${new Date(startDate).getMonth() + 1}/${new Date(startDate).getDate()}/${new Date(startDate).getFullYear()}`)
    endDate = new Date(`${new Date(endDate).getMonth() + 1}/${new Date(endDate).getDate()}/${new Date(endDate).getFullYear()}`)

    if (((new Date(startDate) <= new Date()) && (new Date(endDate) > new Date())) || ((new Date(startDate) < new Date()) && (new Date(endDate) >= new Date()))) {
      return 'Active'
    } else if (new Date(startDate) > new Date()) {
      return 'Will Active Soon'
    } else if (new Date(endDate) < new Date()) {
      return 'Closed'
    }
  }


  const typo = (content, com) => <Grid item>
    <Typography
      variant={com}
      color={'text.light'}
    >
      {content}
    </Typography>
  </Grid>

  return (<Grid container
    justifyContent={'center'}
    alignItems={'left'}
    direction={'column'}
    minWidth={500}
    p={2}
    sx={{
      borderRadius: 2,
      backgroundColor: 'transparent'
    }}
    spacing={1}
  >
    <Grid item
      container
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      {typo('Poll Details')}
    </Grid>
    {typo(`TITLE : ${deepInfo.title}`, 'h5')}
    {typo(`pollId : ${deepInfo.pollId}`)}
    {typo(`DOC : ${formatDate(deepInfo.createdAt)}`)}
    {typo(`Start Date : ${formatDate(deepInfo.startdate)}`)}
    {/* status {`${new Date(deepInfo['startdate']).getMonth()}`} */}
    {typo(`End Date : ${formatDate(deepInfo.enddate)}`)}
    {typo(`Status : ${isActiveOrNot(new Date(deepInfo['startdate']), new Date(deepInfo['enddate']))}`)}
  </Grid>)
}

export const onEmptyShowMessage = (message) => <Grid container
  justifyContent={'center'}
  bgcolor={'transparent'}
>
  <Card
    sx={{
      borderRadius: 5,
      backgroundColor: 'transparent'
    }}
  >
    <CardContent
      sx={{
        margin: 2,
        backgroundColor: 'background.black',
        color: 'text.light',
        borderRadius: 4
      }}
    >
      {message}
    </CardContent>
  </Card>
</Grid>


function GetChartSection({ pollInfo, deepInfo }) {

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }
  let cNames = []
  deepInfo.forEach((item) => {
    cNames.push(item.name)
  })

  let cVoteCount = []

  deepInfo.forEach((item) => {
    cVoteCount.push(item.status)
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

      <Card

        elevation={10}
        sx={{
          width: '40%',
          mr: '2',
          backgroundColor: 'transparent',
          marginRight: 3,
          borderRadius: 4,
          padding: 3
        }}
      >
        <Grid item
          container
          justifyContent={'center'}
          alignItems={'left'}
          direction={'column'}

        ><PollData deepInfo={pollInfo} />
        </Grid>
      </Card>
      <Grid item sx={{ width: '50%', }}>
        <Card
          elevation={10}
          sx={{
            opacity: 0.8,
            backgroundImage: 'linear-gradient(to right, #43e97b 0%, #38f9d7 100%)',
            borderRadius: 2,
            paddign: 2
          }}
        >
          <CardContent>
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
              options={

                {
                  maintainAspectRatio: false,
                }}
            /></CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default GetChartSection





export const ShowTableRow = ({ row, cRow }) => {

  const getDec = {
    color: '#f2f2f2'
  }

  const getIconDec = {
    color: 'red'
  }
  const [open, setOpen] = useState(false)
  const formatDate = (date) => {
    return `${new Date(date).getDate()}-${new Date(date).getMonth() + 1}-${new Date(date).getFullYear()}`
  }
  return (<React.Fragment>
    <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
      <TableCell>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => {
            setOpen(!open)
          }}
        >
          {open ? <KeyboardArrowUp sx={getIconDec} /> : <KeyboardArrowDown sx={getIconDec} />}
        </IconButton>
      </TableCell>
      <TableCell sx={getDec} align="right">
        {row.pollId}
      </TableCell>
      <TableCell sx={getDec} align="right">{row.title}</TableCell>
      <TableCell sx={getDec} align="right">{formatDate(row.createdAt)}</TableCell>
      <TableCell sx={getDec} align="right">{formatDate(row.startdate)}</TableCell>
      <TableCell sx={getDec} align="right">{formatDate(row.enddate)}</TableCell>
    </TableRow>
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant={'h6'} gutterBottom component={'div'}>
              Candidate-Detials
            </Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={getDec}>ID</TableCell>
                  <TableCell sx={getDec}>NAME</TableCell>
                  <TableCell sx={getDec} align="right">MANIFESTO</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cRow.map((candidate) => (
                  <TableRow key={candidate.cID}>
                    <TableCell sx={getDec} component="th" scope="row">
                      {candidate.cID}
                    </TableCell>
                    <TableCell sx={getDec}>{candidate.cName}</TableCell>
                    <TableCell sx={getDec} align="right">{candidate.cManifesto}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow></React.Fragment>
  )
}

const isActiveOrNot = (startDate, endDate) => {
  startDate = new Date(`${new Date(startDate).getMonth() + 1}/${new Date(startDate).getDate()}/${new Date(startDate).getFullYear()}`)
  endDate = new Date(`${new Date(endDate).getMonth() + 1}/${new Date(endDate).getDate()}/${new Date(endDate).getFullYear()}`)

  if (((new Date(startDate) <= new Date()) && (new Date(endDate) > new Date())) || ((new Date(startDate) < new Date()) && (new Date(endDate) >= new Date()))) {
    return 'Active'
  } else if (new Date(startDate) > new Date()) {
    return 'Will Active Soon'
  } else if (new Date(endDate) < new Date()) {
    return 'Closed'
  }
}


const p = (data) => console.log(data)

export function ShowTable({ data, email }) {

  const getDec = {
    color: '#f2f2f2'
  }

  const getIconDec = {
    color: 'red'
  }
  const dispatch = useDispatch()
  const row = data.pollInfo
  const cRow = data.cArr


  const wrapper = <Card
    elevation={10}
    sx={{
      marginTop: 2,
      marginBottom: 2,
      padding: 2,
      backgroundColor: 'transparent',
      borderRadius: 4
    }}
  >
    <TableContainer
      sx={{
        backgroundColor: 'transparent',
        color: 'white'
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell >
              <Button
                sx={{
                  color: 'red',
                  borderColor: 'text.light'
                }}
                variant={'outlined'}
                onClick={() => {

                  if (isActiveOrNot(new Date(row['startdate']), new Date(row['enddate'])) === 'Will Active Soon') {
                    dispatch(addVoterPIDS(JSON.stringify({ '_pid': row.pollId, '_email': email })))
                  }
                  dispatch(manageAfterSubscribe())
                }}
              >
                {isActiveOrNot(new Date(row['startdate']), new Date(row['enddate'])) === 'Will Active Soon'
                  ? 'SUBSCRIBE'
                  : isActiveOrNot(new Date(row['startdate']), new Date(row['enddate'])) === 'Closed'
                    ? 'CLOSED X'
                    : 'Active X'}
              </Button>
            </TableCell>
            <TableCell sx={getDec} align="right">POLL-ID</TableCell>
            <TableCell sx={getDec} align="right">TITLE</TableCell>
            <TableCell sx={getDec} align="right">DOC</TableCell>
            <TableCell sx={getDec} align="right">OPEN ON</TableCell>
            <TableCell sx={getDec} align="right">CLOSE ON</TableCell></TableRow>
        </TableHead>
        <TableBody>
          <ShowTableRow row={row} cRow={cRow} />
        </TableBody>
      </Table>
    </TableContainer></Card>


  return (
    <GetBoxNew2 content={wrapper}></GetBoxNew2>
  );
}




const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));


export const ThemeSwitch = () => {

  const dispatch = useDispatch()
  return (

    <FormControlLabel
      onChange={() => {
        dispatch(handleTheme())
      }}
      control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}
    />
  )
}