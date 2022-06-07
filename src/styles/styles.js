import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles({
    card: {
        borderRadius: 4,
        width: '100%',
        opacity: 0.2,
        backgroundColor: '#000000'
    },
    body: {
        color: 'black',
        backgroundImage: 'linear-gradient(90deg, #c94b4b 1%, #4b134f 100%)'
    },
    appbar: {
        borderRadius: 10,
        backgroundColor: 'black',
        color: 'text.light',
    },
    opaqueBack: {
        backgroundColor: 'black',
        opacity: 0.8,
        color: 'yellow'
    },
    opaqueBack2: {
        backgroundColor: 'black',
        color: 'white',
        opacity: 0.9
    },
    dack: {
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'red'
    },
    button: {
        backgroundImage: 'linear-gradient(90deg, #c94b4b 1%, #4b134f 100%)',
    },
    thoughtArea: {
        backgroundColor: 'black'
    },
    msgArea: {
        backgroundColor: 'black',
        overflowY: 'scroll',

    }
})