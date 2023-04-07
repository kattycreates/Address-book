import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = ({ handleClose, alert }) => {
  const { message, isOpen, severity } = alert;
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert
        severity={severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
