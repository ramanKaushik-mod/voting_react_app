import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { getMsg, getSnackBar, resetSnackBar } from './features/mainSlice';
import { useSelector, useDispatch } from 'react-redux';
import MuiAlert from '@mui/material/Alert';
import { useStyles } from './styles/styles';





export default function ShowSnackbar() {
  const classes = useStyles()
  const msg = useSelector(getMsg)
  const snack = useSelector(getSnackBar)
  const dispatch = useDispatch()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(resetSnackBar())
  };
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert  className={classes.body} elevation={10} ref={ref} variant="div" {...props} />;
  });

  return (
    <Snackbar
      severity="success"
      open={snack}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
