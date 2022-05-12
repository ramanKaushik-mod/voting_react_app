import { Add, ExpandLess, ExpandMore, KeyboardArrowDown, KeyboardArrowUp, KeyboardArrowUpOutlined, Person, Poll, Remove, Subscript, SubscriptionsRounded, SubscriptionsTwoTone, TableBar } from "@mui/icons-material"
import { TextField, Grid, Typography, TableContainer, Table, TableCell, TableRow, TableHead, TableBody, IconButton, Button, Tooltip, Collapse, LinearProgress, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Card, CardContent } from "@mui/material"
import GetBox, { GetBoxNew2 } from "../../components/layout-components/getBox"
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { currentPollId, getPollData, selectIsPending } from "../mainSlice"
import { Box, typographyVariant } from "@mui/system"
import { Chart as chartjs } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import { addVoterPIDS, manageAfterSubscribe } from "../mainSlice"
import '../../App.css'


export const getTextField = (label, placeholder, ip, key, h, value) => {
  return <TextField
    value={value !== null ? value : null}
    required
    component={'div'}
    key={key}
    inputMode={ip}
    label={label}
    variant={"filled"}
    fullWidth={true}
    sx={{
      backgroundColor: "background.cardBackground",
      maxWidth: 340,
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

  const wrapper =
    <TableContainer aria-label="collapsible table" sx={{
      backgroundColor: 'black'
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
    </TableContainer>

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
  const getDec = {
    color: 'text.light'
  }

  const pollData = useSelector(getPollData)
  const isPending = useSelector(selectIsPending)

  const wrapper =
    <TableContainer>
      <Table aria-label="collapsible table" sx={{
        backgroundColor: 'black'
      }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell sx={getDec}>POLL ID</TableCell>
            <TableCell sx={getDec} align="right">TITLE</TableCell>
            <TableCell sx={getDec} align="right">DOC</TableCell>
            <TableCell sx={getDec} align="right">OPEN</TableCell>
            <TableCell sx={getDec} align="right">CLOSE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pollData.map((row) => (
            <Row key={row.pollId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>

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

      <Grid item
        bgcolor={'background.cardBackground'}
        p={3}
        sx={{ width: '50%' }}>
        <Grid item
          container
          justifyContent={'center'}
          alignItems={'left'}
          direction={'column'}

        ><PollData deepInfo={pollInfo} />
        </Grid>
      </Grid>
      <Grid item sx={{ width: '50%', }}>
        <Box
          bgcolor={'background.chartColor'}
          p={2}
          borderRadius={2}
        >
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
          />
        </Box>
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


  const wrapper = <TableContainer
    sx={{
      backgroundColor: 'black',
      color: 'white'
    }}
  >
    <Table>
      <TableHead>
        <TableRow>
          <TableCell >
            {isActiveOrNot(new Date(row['startdate']), new Date(row['enddate'])) === 'Active' ? <Button
              sx={{
                color: 'red',
                borderColor: 'text.light'
              }}
              variant={'outlined'}
              onClick={() => {
                dispatch(addVoterPIDS(JSON.stringify({ '_pid': row.pollId, '_email': email })))
                dispatch(manageAfterSubscribe())
              }}
            >
              SUBSCRIBE
            </Button> : <Grid
            container
            justifyContent={'center'}
            py={0.5}
              sx={{
                color:'red',
                border: 1,
                borderColor:'text.light',
                borderRadius:2,
                paddingX:2
              }}
            ><Grid item>CLOSED</Grid></Grid>}
          </TableCell>
          <TableCell sx={getDec} align="right">POLL-ID</TableCell>
          <TableCell sx={getDec} align="right">TITLE</TableCell>
          <TableCell sx={getDec} align="right">DOC</TableCell>
          <TableCell sx={getDec} align="right">OPEN</TableCell>
          <TableCell sx={getDec} align="right">CLOSE</TableCell></TableRow>
      </TableHead>
      <TableBody>
        <ShowTableRow row={row} cRow={cRow} />
      </TableBody>
    </Table>
  </TableContainer>


  return (
    <GetBoxNew2 content={wrapper}></GetBoxNew2>
  );
}