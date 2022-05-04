import { Add, ExpandLess, ExpandMore, KeyboardArrowDown, KeyboardArrowUp, KeyboardArrowUpOutlined, Person, Poll, Remove, Subscript, SubscriptionsRounded, SubscriptionsTwoTone, TableBar } from "@mui/icons-material"
import { TextField, Grid, Typography, TableContainer, Table, TableCell, TableRow, TableHead, TableBody, IconButton, Button, Tooltip, Collapse, LinearProgress, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material"
import GetBox, { GetBoxNew2 } from "../../components/layout-components/getBox"
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { currentPollId, getPollData, selectIsPending } from "../mainSlice"
import { Box } from "@mui/system"
import { Chart as chartjs } from "chart.js/auto";
import { Bar } from "react-chartjs-2"
import { addVoterPIDS, manageAfterSubscribe } from "../mainSlice"


export const getTextField = (label, placeholder, ip, key, h, c) => {
  return <TextField
    required
    component={'div'}
    key={key}
    type={ip.inputMode}
    label={label}
    variant={"filled"}
    fullWidth={true}
    sx={{
      backgroundColor: "#252533",
      maxWidth: 340,
    }}
    onChange={h}
    placeholder={placeholder}

    color={c} />
}


export const GetCandidateDetails = ({
  data
}) => {

  const cpID = useSelector(currentPollId)

  const wrapper = <Grid container
    justifyContent={'center'}
    alignItems={'center'}
  >
    <Grid item container
      justifyContent={'center'}
      sx={{
        width: '100%'
      }}
    >
      <Typography>
        Poll-ID : {!cpID ? '' : cpID}
      </Typography>
    </Grid>
    <Grid item>
      <TableContainer>
        <Table

          sx={{ width: '100%' }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>S.NO.</TableCell>
              <TableCell align="right">NAME</TableCell>
              <TableCell align="right">MANIFESTO</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              data.map(row => (
                <TableRow
                  key={row.key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.key}
                  </TableCell>
                  <TableCell align="right">{row.candidateName.toUpperCase()}</TableCell>
                  <TableCell align="right">{row.candidateManifest}</TableCell>

                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer></Grid>
  </Grid>
  return data.length > 1 && <GetBox c="#292732" br={5} content={wrapper} w={600} p={4}></GetBox>

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
              <Typography sx={getDec}  variant={'h6'} gutterBottom component={'div'}>
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
    color: '#f2f2f2'
  }

  const getIconDec = {
    color: 'red'
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

  const onEmptyPollData = <Grid>
    There is no data in the poll
  </Grid>
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
      <Typography
        fontWeight={800}
        sx={{
          color: 'white'
        }}
      >
        Poll Details
      </Typography>
    </Grid>
    <Grid item>
      <Typography>
        TITLE : {deepInfo.title}
      </Typography>
    </Grid>
    <Grid item>
      <Typography>
        pollId : {deepInfo.pollId}
      </Typography></Grid>
    <Grid item>
      <Typography>
        DOC : {formatDate(deepInfo.createdAt)}
      </Typography></Grid>
    <Grid item>
      <Typography>
        Start Date : {formatDate(deepInfo.startdate)}
      </Typography></Grid>
    <Grid item>
      <Typography>
        End Date : {formatDate(deepInfo.enddate)}
      </Typography></Grid>
  </Grid>)
}



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
      <Grid item sx={open ? { width: '100%' } : {}}>


        <Grid item
          container
          justifyContent={'center'}
          alignItems={'center'}
          direction={'column'}

        ><PollData deepInfo={pollInfo} />
        </Grid></Grid>
      <Grid item>
        <Collapse in={!open} timeout="auto" unmountOnExit>
          <Box
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
              options={{
                maintainAspectRatio: false
              }}
            />
          </Box>
        </Collapse></Grid>
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
            <Button
              variant={'outlined'}
              onClick={() => {
                dispatch(addVoterPIDS(JSON.stringify({ '_pid': row.pollId, '_email': email })))
                dispatch(manageAfterSubscribe())
              }}
            >
              <Typography
                color={'red'}
              >
                SUBSCRIBE
              </Typography>
            </Button>
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