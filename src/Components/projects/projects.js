import { useState, useEffect, forwardRef, React } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import {  TextareaAutosize, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { FormLabel } from "@mui/material";
import { useDispatch } from 'react-redux';
import { setView } from '../../store/reducers/containerReducer';
import { setId } from "../../store/reducers/projectReducer";

const Projects = () => {
   const dispatch = useDispatch()
   const role = sessionStorage.getItem('role')
 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [togle, setToggle] = useState(false);

  const [projectName, setProjectName] = useState();
  const [date, SetDate] = useState("");
  const [description, setDescription] = useState();
  const [photo,setPhoto] = useState()

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

  
console.log(photo)

  const onSubmit = async () => {
    console.log("photo", photo)
    let formData = new FormData();
    formData.append('file', photo)
    formData.append('name', projectName)
    formData.append('Date', date.$D + "/" + date.$M + "/" + date.$y)
    formData.append('Description', description)
    formData.append('fileName', photo.name)
    axios
      .post("http://localhost:5000/project/add", formData)
      .then(() => {
        setMsg("Successfully Added Projects");
        SetSeverity("success");
        setOpenSnack(true);
        setToggle(!togle)
      })
      .catch((err) => {
        setMsg("oops! Somthing Went Wrong");
        SetSeverity("error");
        setOpenSnack(true);
        console.log(err);
      });

    setOpen(false);
  };

  
  const [sValue,setSvalue] = useState('')

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/project")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, [togle]);

  
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


  const des = (id) => {
    dispatch(setView('ProjectDes'))
    dispatch(setId(id))
  }
  return (
    <>
      <div div style={{
        position: "static",
        top: 10,
        marginTop:10
      }
      }>
      <TextField id="outlined-basic" label="Search" variant="outlined" style={{ width: 400 }} 
        value = {sValue}
        onChange={(e) => {
          setSvalue (e.target.value.toLowerCase())
          
          }} />
        
        {(role == "admin" && (
          <>
          <Button
          onClick={()=>{dispatch(setView('ProjectReport'))}}
          variant="contained"
          
          style={{
            left: 200,
            top: 10,
            width: 200,
            height: 50,
            fontSize: 20,
          }}
        >
          Report
        </Button>
        <Button
          onClick={handleOpen}
          variant="contained"
          color="success"
          style={{
            left: 230,
            top: 10,
            width: 200,
            height: 50,
            fontSize: 20,
          }}
        >
          Add Projects
        </Button>
            </>
        ))}
        
        
</div>

      <div div style={{
        position: "static",
       
        marginTop:10
      }
      }>
  <Stack spacing={4}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
         {projects.filter(project=>project.name.toLowerCase().includes(sValue)).map((pro) => (

            <Grid item xs  = {4} >
              <Box sx={{ width: 350, minHeight: 150}}>
              <Card>
                <CardContent
                  component="img"
                  src= {pro.avatar}
                  height={"500"} 
                  width={"500"}
                />
                  <CardContent>
                    <Typography sx={{ fontSize: 18 }} gutterBottom>
                      {pro.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    
                      <Button size="small" onClick = {()=>{des(pro._id)}}>Learn More</Button>
                   
                  </CardActions>
                </Card>
              </Box>
            
          </Grid>
          ))
          
        }
          </Grid>
          </Stack>
        </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Projects
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
            <input id="file" name="file" type="file" onChange={(e) => setPhoto(e.target.files[0])} />
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
    </>
  );
};

export default Projects;
