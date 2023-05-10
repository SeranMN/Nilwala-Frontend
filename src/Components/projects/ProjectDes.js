import { Button, Card, CardContent, Typography,TextareaAutosize } from "@mui/material";
import { Stack } from "@mui/system";
import axios from "axios";
import { React, useEffect, useState, forwardRef } from "react";
import { Link, useParams } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormLabel } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setView } from '../../store/reducers/containerReducer';

const ProjectDes = () => {
  const id = useSelector(state => state.project.id)
   const dispatch = useDispatch()

    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [DialogOpen, DialogSetOpen] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const [project, setProject] = useState("");

   const [projectName, setProjectName] = useState('');
  const [date, SetDate] = useState();
  const [description, setDescription] = useState('project.Description');
  const [photo, setPhoto] = useState()

  const [toggle, setToggle] = useState(false);

  

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

  


  const deleteProject = async () => {
    axios
      .delete(`http://localhost:5000/project/delete/${id}`)
      .then(() => {
       
          setMsg("Massage Deleted Sucessfully");
        SetSeverity("success");
          setOpenSnack(true);
          
          dispatch(setView('Projects'))
        
        
        

      })
      .catch((err) => {
        setMsg("Oops! Somthing Went Wrong");
        SetSeverity("error");
        setOpenSnack(true);
        console.log(err);
      });
  };

 

 
 
  

   const onSubmit = async () => {
    const project = {
      name: projectName,
      Date: date,
      Description: description,
    };
    axios
      .put(`http://localhost:5000/project/update/${id}`, project)
      .then(() => {
        setMsg("Successfully Edited Projects");
        SetSeverity("success");
        setOpenSnack(true);
        setToggle(!toggle);
      })
      .catch((err) => {
        setMsg("oops! Somthing Went Wrong");
        SetSeverity("error");
        setOpenSnack(true);
        console.log(err);
      });

    setOpen(false);
  };

   useEffect(() => {
      axios
      .get(`http://localhost:5000/project/${id}`)
      .then((res) => {
        setProject(res.data);
        setProjectName(res.data.name)
        setDescription(res.data.Description)
        SetDate(res.data.date)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [toggle]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,

  };

  return (
    <>
      <Stack spacing={4}>
        <Stack spacing={2}>

          <Typography variant="h1" gutterBottom>
            
            {project.name}
          </Typography>
          <Card>
             <CardContent
                  component="img"
                  src={project.avatar}
                  height={"150"} 
                  width={"150"}
                />
            <CardContent>
              <Typography>{project.Description}</Typography>
              </CardContent>
            </Card>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs = {2}>
            <Button onClick={handleOpen}>Edit</Button>
          </Grid>
          <Grid item xs = {2}>
            <Button onClick={()=>{DialogSetOpen(true)}}>delete</Button>
            </Grid>
        </Grid>
      </Stack>


      <Dialog
        open={DialogOpen}
        onClose={()=>{DialogSetOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete project"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to delete this
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{DialogSetOpen(false)}}>Cancel</Button>
          <Button onClick={() => {
            DialogSetOpen(false);
          deleteProject()}} autoFocus>
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

 <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit project
          </Typography>
          <Stack spacing={2}>
            <TextField
              required
              id="outlined-basic"
              label="Project Name"
              variant="outlined"
              style={{ width: 400 }}
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />{" "}
            <br />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Basic example"
                value={date}
                onChange={(e) => {
                  SetDate(e);
                }}
                style={{ width: 200 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <TextareaAutosize
              required
              id="outlined-basic"
              placeholder="Description"
              style={{ width: 400, maxHeight: 400 }}

              minRows={20}
              maxRows={40}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <FormLabel sx={{ color: "black", minWidth: '105px' }}>Upload Photo* :</FormLabel>
            <input id="file" name="file" type="file" onChange={(e) => setPhoto("photo", e.currentTarget.files[0])} />
            {projectName == "" ||
              date == "" ||
              description == "" ||
              projectName == null ||
              date == null ||
              description == null ? (
              <Button variant="contained" color="success" disabled="true">
                Submit
              </Button>
            ) : (
              <Button variant="contained" color="success" onClick={onSubmit}>
                Submit
                </Button>
                
            )}
            
          </Stack>
        </Box>
      </Modal>

    </>
  );
};

export default ProjectDes;
