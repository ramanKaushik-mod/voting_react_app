

import { ArrowForwardIos, Comment, Contactless, Send } from '@mui/icons-material'
import { Avatar, Button, Card, CardActions, CardContent, Grid, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFormData, getFormDataStatus, getIsFormDataPending, handleSnackBar, sendFormDataThunk } from '../features/mainSlice'
import { getTextField } from '../features/Utility/utility'
import { useStyles } from '../styles/styles'

function UView() {

    const dispatch = useDispatch()

    const isPending = useSelector(getIsFormDataPending)
    const statusCode = useSelector(getFormDataStatus)
    const data = useSelector(getFormData)

    const classes = useStyles()

    const [formData, setFormData] = useState({
        email: '',
        msg: ''
    })

    const emailHandler = (e) => {
        setFormData({
            ...formData,
            email: e.target.value
        })
    }
    const msgHandler = (e) => {
        setFormData({
            ...formData,
            msg: e.target.value
        })
    }

    const textFieldInfo = [
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
            "label": "Have a thought ?",
            "ph": "What do you think",
            "ip": { inputMode: 'text', pattern: /w+/ },
            "handler": msgHandler,
            c: ''
        }
    ]

    const view = (item) => <Card
        sx={{
            margin: 1,
            width: '500px',
            borderRadius: 4
        }}
        elevation={10}
        className={classes.body}
    >
        <CardContent>
            <Grid
                container
                justifyContent={'left'}
                alignItems={'left'}
                direction={'column'}
            >
                <Grid item container
                    direction={'row'}
                    justifyContent={'left'}
                    alignItems={'center'}
                    className={classes.body}
                    sx={{
                        paddingX: 2
                    }}
                >
                    <Grid item><Avatar
                        sx={{ width: 24, height: 24 }}

                        className={classes.body}
                    ><Typography
                        fontSize={13}
                    >
                            {item.email[0].toUpperCase()}
                        </Typography>
                    </Avatar></Grid>
                    <Grid item>
                        <IconButton
                            size='small'
                            title={item.email}
                        >
                            <Typography
                                fontSize={15}>
                                {item.email.split('@')[0]}
                            </Typography>
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid item container

                    direction={'row'}
                    justifyContent={'left'}
                    alignItems={'center'}
                    className={classes.body}
                    sx={{
                        paddingX: 2
                    }}
                >
                    <Grid item
                    width={'10%'}
                        p={0.5}
                    >
                        <ArrowForwardIos  fontSize='small'></ArrowForwardIos>
                    </Grid>
                    <Grid item
                    
                    width={'90%'}>
                        <Typography
                            fontSize={13}
                        >
                            {item.msg}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    return (
        <Card
            component={'form'}
            elevation={10}
            sx={{
                width: '100%',
                border: 2,
                marginBottom: 18,
                borderColor: 'white',
                backgroundColor: 'transparent',
                borderRadius: 4,
            }}
        >

            <CardContent
                sx={{
                    padding: 0,
                }}
            >
                <Grid container
                    direction={'row'}
                >
                    <Grid container item
                        justifyContent={'center'}
                        alignItems={'left'}
                        direction={'column'}
                        width={'50%'}
                        p={2}
                    >
                        {textFieldInfo.map((item) => <Grid pt={1} item width={item.key !== 0 ? '100%' : 300} key={item.key}>{
                            getTextField(item.label, item.ph, item.ip, item.key, item.handler, null, (item.key !== 0 ? true : false))}</Grid>)}
                    </Grid>
                    <Grid container item
                        height='240px'
                        width={'50%'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        direction={'row'}
                        color={'white'}
                        p={2}
                        className={classes.msgArea}
                    >
                        {data.length !== 0 && data.map(item => (
                            <Grid item>
                                {view(item)}
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions
                className={classes.thoughtArea}
            >
                <Grid container
                    justifyContent={'center'}

                >
                    <Grid item container
                        justifyContent={'center'}
                        width={'50%'}
                    ><Button
                        type={'reset'}
                        endIcon={<Send></Send>}
                        variant={'outlined'}
                        className={classes.button}
                        onClick={() => {

                            if (`${formData.email.trim()}`.search(/([a-z A-Z])+([0-9])*\@([a-z])+\.(com)/) === -1) {
                                dispatch(handleSnackBar('Enter a valid email address'))
                                return
                            }
                            if (`${formData.msg}`.trim().length <= 0) {
                                dispatch(handleSnackBar("Can't send an empty message"))
                                return
                            }
                            dispatch(sendFormDataThunk(JSON.stringify({ 'data': formData, type: 'POST' })))
                        }}
                    >
                            POST ME
                        </Button></Grid>
                    <Grid item
                        width={'50%'}></Grid>
                </Grid>
            </CardActions>
        </Card>
    )
}

export default UView