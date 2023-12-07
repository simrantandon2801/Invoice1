import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function Alert({ 
  open, 
  duration = 5000, 
  onClose = () => {}, 
  anchorOrigin = { vertical: 'top', horizontal: 'center' }, 
  type, 
  ...rest 
}) {
  if (!type || !rest.children) {
    return null;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose(false);
  };

  return (
    <Snackbar
      open={open}
      anchorOrigin={anchorOrigin}
      autoHideDuration={duration}
      onClose={handleClose}
    >
      <MuiAlert onClose={handleClose} elevation={6} variant="filled" severity={type} {...rest} />
    </Snackbar>
  );
}
