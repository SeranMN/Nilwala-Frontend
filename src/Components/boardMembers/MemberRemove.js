import { React, useState, forwardRef } from 'react'
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MemberRemove = ({ id, toggle, setToggle }) => {

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [severity, SetSeverity] = useState("");
    const [msg, setMsg] = useState("");

    const [openSnack, setOpenSnack] = useState(false);

    const handleCloseSnack = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenSnack(false);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open1 = Boolean(anchorEl);
    const handleClick1 = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl(null);
    };

    const [DialogOpen, DialogSetOpen] = useState(false);
    const handleDelete = () => {
        console.log("id", id)
        axios.delete(`http://localhost:5000/boardMembers/delete/${id}`).then((res) => {
            setToggle(!toggle)
            handleClose1() 
            setMsg("Deleted Sucessfully");
            SetSeverity("success");
            setOpenSnack(true);
        }).catch((err) => {
            console.log(err, "errr")
            setMsg("Oops! Somthing Went Wrong");
        SetSeverity("error");
        setOpenSnack(true);
        })
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open1 ? 'long-menu' : undefined}
                aria-expanded={open1 ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick1} >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open1}
                onClose={handleClose1}
                PaperProps={{
                    style: {
                        width: '20ch',
                    },
                }}

            >
                <MenuItem onClick={() => { DialogSetOpen(true) }}>
                    Remove
                </MenuItem>
            </Menu>

            <Dialog
                open={DialogOpen}
                onClose={() => { DialogSetOpen(false) }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure to delete this "}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure to delete this
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { DialogSetOpen(false) }}>Cancel</Button>
                    <Button onClick={() => {
                        DialogSetOpen(false);
                        handleDelete()
                    }} >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleCloseSnack}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <Alert
                    onClose={handleCloseSnack}
                    severity={severity}
                    sx={{ width: "100%" }}
                >
                    {msg}
                </Alert>
            </Snackbar>

        </div>
    )
}

export default MemberRemove