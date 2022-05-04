import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

function GetBox({ height, c, content, br, w, p}) {
    return (
        <Box
            justifyContent={'center'}
            alignItems={'center'}
            bgcolor={c}
            height={height}
            borderRadius={br}
            minWidth={w}
            padding={p}
            boxSizing={'content-box'}
        >
            {content}
        </Box>
    )
}

export default GetBox


export function GetBoxNew({content}){
    return (
        <Box
            marginX={10}
            sx={{
                backgroundColor:'grey'
            }}
        >
            {content}
        </Box>
    )
}


export function GetBoxNew2({content}){
    return (
        <Box
            sx={{
                backgroundColor:'transparent',
                width:'100%'
            }}
        >
            {content}
        </Box>
    )
}