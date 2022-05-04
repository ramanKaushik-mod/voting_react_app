import { ArrowForwardIosOutlined, DownloadDone, Downloading, NotAccessibleRounded, SearchRounded, SourceOutlined } from '@mui/icons-material';
import { styled, alpha, InputBase, IconButton, Grid, CircularProgress, Button, Card, CardHeader, CardContent, Avatar, Table, TableBody, TableRow, TableCell, CardActions } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShowTable } from '../features/Utility/utility';
import { getVoterPIDS, selectIsPending, manageAfterSubscribe, pGetPollSelector, pPollStatusSelector, getPoll, handleToPolls } from '../features/mainSlice';
import { Box } from '@mui/system';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('lg')]: {
            width: '80ch',
            '&:focus': {
                width: '86ch',
            },
        },
    },
}));

const p = (data) => console.log(data)


function Voter({ vData }) {
    const getDec = {
        color: '#f2f2f2'
    }

    const getIconDec = {
        color: 'red'
    }

    // S T A T E S
    const [searchPID, setSearchablePID] = useState('')
    const [hFlag, setHFlag] = useState(false)

    // S E L E C T O R S
    const isPending = useSelector(selectIsPending)
    const pollStatus = useSelector(pPollStatusSelector)
    const pollData = useSelector(pGetPollSelector)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {

    }, [])

    const sectionOne = <Box>
        <Grid
            container item
            justifyContent={'center'}
            alignItems={'center'}
            direction={'row'}
            sm={12}
        >



        </Grid>

    </Box>


    const userInfo = (data) => <Grid item
        sx={{
            backgroundColor: 'black',
            width: '100%',
        }} >
        {/*  */}
        <Card

            sx={{
                backgroundColor: 'black',
                width: '100%',
            }}>

            <CardHeader
                sx={{
                    color: 'white',
                    backgroundColor: 'black',
                }}
                title={`${data[3]}`.toUpperCase()}>

            </CardHeader>

            <CardContent
                sx={{
                    backgroundColor: '#0d102a',
                    color: '#f2f2f2',
                    width: '100%'
                }}
            >
                <Grid container
                    justifyContent={'center'}
                    alignItems={'center'}
                    direction={'row'}
                >
                    <Grid item>
                        <Avatar
                            component={'div'}
                            sx={{
                                width: 200,
                                height: 200,
                                objectFit: 'cover',
                                borderRadius: 4
                            }}
                            src={require('./images/file.jpg')}
                        >


                        </Avatar>

                    </Grid>
                    <Grid item
                        sx={{
                            backgroundColor: '#242429',
                            marginX: 4
                        }}
                    >
                        <Table
                            sx={{
                                backgroundColor: 'black'
                            }}
                        >
                            <TableBody>
                                <TableRow sx={{
                                    color: 'white'
                                }}>
                                    <TableCell sx={getDec}>Name</TableCell>
                                    <TableCell sx={getDec}>{`${data[0]}`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={getDec}>Email</TableCell>
                                    <TableCell sx={getDec}>{`${data[2]}`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell sx={getDec}>Contact</TableCell>
                                    <TableCell sx={getDec}>{`${data[1]}`}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions >
                <Grid container
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    direction={'row'}
                >
                    <Grid item>
                        <Grid item
                            m={2}
                            justifyContent={'center'}
                        >
                            {!hFlag
                                ? <IconButton
                                    variant='outlined'
                                    onClick={() => {
                                        dispatch(getVoterPIDS(JSON.stringify({ _email: vData.voterId })))
                                        setHFlag(true)
                                    }}
                                ><Downloading sx={getIconDec}></Downloading>
                                </IconButton>
                                : isPending
                                    ? <CircularProgress />
                                    : <IconButton
                                        sx={getIconDec}
                                        onClick={() => {
                                            setHFlag(false)
                                            dispatch(handleToPolls(true))

                                        }}
                                    ><ArrowForwardIosOutlined sx={getIconDec} />

                                    </IconButton>
                            }
                        </Grid>
                    </Grid>

                    <Grid item
                        width={'70%'}
                    >
                        <Search
                            onChange={(e) => {
                                setSearchablePID(e.target.value)
                                if (pollStatus !== 0) {
                                    dispatch(manageAfterSubscribe())
                                }
                            }}
                        >
                            <StyledInputBase
                                placeholder="Enter a Poll-Id"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Grid>
                    <Grid item>

                        {!hFlag ? <IconButton
                            onClick={() => {
                                dispatch(getPoll(JSON.stringify({ '_pid': searchPID })))
                            }}
                            sx={getIconDec}
                        >
                            {!isPending
                                ? <SearchRounded />
                                : <SourceOutlined />}

                        </IconButton> :
                            <IconButton
                                onClick={() => {
                                    setHFlag(false)
                                    dispatch(getPoll(JSON.stringify({ '_pid': searchPID })))
                                }}
                                sx={getIconDec}
                            >
                                <SearchRounded />
                            </IconButton>
                        }
                    </Grid>
                </Grid>
            </CardActions>
        </Card>
    </Grid>

    return (
        <Grid container
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

            <Grid item container sx={{ width: '100%' }}
                justifyContent={'center'} direction={'column'} p={4}>

                <Grid item >
                    {userInfo(vData)}

                </Grid>

                {(pollStatus !== 0) && <Grid item container
                    alignItems={'center'}
                    justifyContent={'center'}>
                    {(pollStatus === 200) && <ShowTable data={pollData} email={vData.voterId} />}
                    {(pollStatus === 190) && <Grid
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                        direction={'row'}
                        m={2}
                    >   <Grid item><NotAccessibleRounded
                        sx={{
                            color: 'red'
                        }}
                    /></Grid>
                        <Grid item p={2}> No poll exist with this POLL-ID {searchPID}</Grid>
                    </Grid>}
                </Grid>}

            </Grid>
        </Grid >
    )
}

export default Voter