import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { getMsg, getSnackBar, resetSnackBar } from './features/mainSlice';
import { useSelector, useDispatch } from 'react-redux';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={10} ref={ref} variant="filled" {...props} />;
});


export default function ShowSnackbar() {
  const msg = useSelector(getMsg)
  const snack = useSelector(getSnackBar)
  const dispatch = useDispatch()
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(resetSnackBar())
  };

  return (
    <Snackbar
      severity="success"
      open={snack}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={'info'} sx={{ width: '100%' }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
