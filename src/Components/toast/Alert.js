import { React, useState, forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
const Alert = (Severity,Msg) => {
  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const [severity, SetSeverity] = useState(Severity);
  const [msg, setMsg] = useState(Msg);

  const [openSnack, setOpenSnack] = useState(true);

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
      }
      console.log(openSnack)

    setOpenSnack(false);
    };
     const vertical = 'bottom'
  const horizontal = 'right'
  return (
    <Snackbar
      open={openSnack}
      autoHideDuration={6000}
      onClose={handleCloseSnack}
      key={"bottomright"}
    >
      <Alert
        onClose={handleCloseSnack}
        severity={severity}
        sx={{ width: "100%" }}
        key={vertical + horizontal}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default Alert;
