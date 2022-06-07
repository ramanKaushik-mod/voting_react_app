import { ArrowForwardIosOutlined, EditOutlined, Downloading, EventAvailableOutlined, NotAccessibleRounded, PresentToAll, SearchRounded, SourceOutlined } from '@mui/icons-material';
import { styled, alpha, InputBase, IconButton, Grid, CircularProgress, Button, Card, CardHeader, CardContent, Avatar, Table, TableBody, TableRow, TableCell, CardActions, Typography } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ShowTable } from '../features/Utility/utility';
import { getVoterPIDS, selectIsPending, manageAfterSubscribe, getUserImg, faauiTHUNK, pGetPollSelector, pPollStatusSelector, getPoll, handleToPolls, handleSnackBar } from '../features/mainSlice';
import { Box } from '@mui/system';
import { useStyles } from '../styles/styles'



export const Search = styled('div')(({ theme }) => ({
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


export const StyledInputBase = styled(InputBase)(({ theme }) => ({
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
                width: '85ch',
            },
        },
    },
}));

const p = (data) => console.log(data)


function Voter({ vData }) {

    const classes = useStyles()

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
    const inputFileRef = useRef(null)
    const imageUrl = useSelector(getUserImg)

    const handleImageIconButton = () => {
        inputFileRef.current.click()
    }

    const handleImageChange = (e) => {
        const uploadable = e.target.files[0]

        new Promise((resolve, reject) => {
            const fr = new FileReader()
            fr.readAsDataURL(uploadable)
            fr.onload = () => {
                resolve(fr.result)
                let res = fr.result
                dispatch(faauiTHUNK(JSON.stringify({
                    type: 'POST',
                    id: vData['id'],
                    imageUrl: `${res}`,
                    person: vData['person']
                })))
            }
            fr.onerror = (error) => {
                reject(error)
            }
        })
    }

    const userInfo = (data) => <Card
        elevation={10}
        sx={{
            backgroundColor: 'transparent',
            borderRadius: 4
        }}>

        <CardHeader
            sx={{
                color: 'text.light',
            }}
            title={`${data[3]}`.toUpperCase()}>

        </CardHeader>

        <CardContent>

            <Grid container
                justifyContent={'center'}
                alignItems={'center'}
                direction={'row'}
            >
                <Grid item container
                    justifyContent={'right'}
                    sx={{
                        width: '50%',
                    }}
                >
                    <Grid item
                        sx={{
                            width: '100%',
                            border: 1,
                            marginBottom: 2,
                            borderColor: 'text.light',
                            borderRadius: 4
                        }}
                        position={'relative'}
                    >
                        <Avatar
                            component={'div'}
                            sx={{
                                width: '100%',
                                height: 200,
                                objectFit: 'cover',
                                borderRadius: 4,
                                backgroundColor: 'background.cardBackground',
                                color: 'black'
                            }}
                            src={imageUrl === null ? null : imageUrl}
                        >


                        </Avatar></Grid>
                    <Grid item container
                        sx={{
                            opacity: 0.4,
                            width: 200,
                            height: 200,
                            backgroundColor: 'black',
                            borderRadius: 4
                        }}

                        justifyContent={'right'}
                        alignItems={'right'}
                        direction={'row'}
                        position={'absolute'}
                    >
                        <Grid item><IconButton
                            sx={{
                            }}
                            onClick={() => {
                                handleImageIconButton()
                            }}
                        >
                            <EditOutlined sx={{
                                color: 'black',
                                backgroundColor: 'white',
                                borderRadius: '50%',
                                padding: 1
                            }}></EditOutlined>
                        </IconButton>
                            <input
                                multiple={false}
                                onChange={handleImageChange}
                                ref={inputFileRef}
                                style={{
                                    display: 'none'
                                }}
                                type={'file'}></input>

                        </Grid>

                    </Grid>


                </Grid>
                <Grid item container
                    sx={{
                        backgroundColor: 'transparent',
                        marginX: 4,
                        width: '50%'
                    }}
                >
                    <Table
                        sx={{
                            backgroundImage: 'linear-gradient(90deg, #4b134f 0%, #c94b4b 90%)',
                            borderRadius: 4
                        }}
                    >
                        <TableBody>
                            <TableRow>
                                <TableCell sx={getDec}>UID</TableCell>
                                <TableCell sx={getDec}>{`${data['id']}`}</TableCell>
                            </TableRow>
                            <TableRow>
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
        <CardActions
            className={classes.opaqueBack}
        >
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
                                title={'syncing details'}
                                variant='outlined'
                                onClick={() => {
                                    if (!isPending) {
                                        dispatch(getVoterPIDS(JSON.stringify({ _email: vData.voterId })))
                                        dispatch(handleSnackBar('syncing subscriptions'))
                                        setHFlag(true)
                                    }
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
                        title={'search'}
                        onClick={() => {
                            if (!isPending && searchPID.length === 6) {
                                dispatch(getPoll(JSON.stringify({ '_pid': searchPID, '_vid': vData['voterId'] })))
                            }
                        }}
                        sx={getIconDec}
                    >
                        {!isPending
                            ? <SearchRounded />
                            : <SourceOutlined />}

                    </IconButton> :
                        <IconButton
                            title={'search'}
                            onClick={() => {
                                if (!isPending && searchPID.length === 6) {
                                    setHFlag(false)
                                    dispatch(getPoll(JSON.stringify({ '_pid': searchPID, '_vid': vData['voterId'] })))
                                }

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

    return (
        <Grid container
            justifyContent={'center'}
            alignItems={'center'}
            direction={"column"}
            sx={{
                backgroundColor: 'transparent',
                width: '100%',
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
                        bgcolor={'background.cardBackground'}
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                        direction={'row'}
                        mt={2}
                        p={2}
                        borderRadius={1}
                    >   <Grid item><NotAccessibleRounded
                        sx={{
                            color: 'red'
                        }}
                    /></Grid>
                        {gridTypo('No poll exist with this POLL-ID', 2, 16, null)}
                    </Grid>}
                    {(pollStatus === 198) && <Grid
                        container
                        justifyContent={'center'}
                        alignItems={'center'}
                        direction={'row'}
                        m={2}
                    >   <Grid item><EventAvailableOutlined
                        sx={{
                            color: 'red'
                        }}
                    /></Grid>
                        {gridTypo('You have already SUBSCRIBED to this POLL', 2, 16, null)}
                    </Grid>}
                </Grid>}

            </Grid>
        </Grid >
    )
}

export default Voter