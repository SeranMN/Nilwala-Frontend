import { useState, useEffect, forwardRef, React } from "react";
import Modal from "@mui/material/Modal";
import { TextareaAutosize, Typography } from "@mui/material";
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
import { firestore } from '../Firebase'
import { addDoc, collection } from '@firebase/firestore'
import { getDocs } from "firebase/firestore"
import { ref } from "firebase/storage";
import { storage } from "../Firebase";


const Projects = () => {

 

  const ref = collection(firestore, "projects")

  const dispatch = useDispatch()
  const role = sessionStorage.getItem('role')

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [togle, setToggle] = useState(false);

  const [projectName, setProjectName] = useState();
  const [date, SetDate] = useState("");
  const [description, setDescription] = useState();
  const [photo, setPhoto] = useState()

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
    const photo = ref(storage, 'mountains.jpg');
    console.log("photo", photo)
    let formData = new FormData();
    const data = {
      name: projectName,
      Date: date.$D + "/" + date.$M + "/" + date.$y,
      Description: description,

    }

    try {

      addDoc(ref, data)
      setMsg("Successfully Added Projects");
        SetSeverity("success");
        setOpenSnack(true);
        setToggle(!togle)
    } catch (e) {
      console.log(e);
    }
   setOpen(false);
  };


  const [sValue, setSvalue] = useState('')

  const [projects, setProjects] = useState([]);
  const projectList = [];
  
  useEffect(() => {
    const getProgect = async () => {
      const querySnapshot = await getDocs(collection(firestore, "projects"));
      console.log(querySnapshot.data);
      //
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        projectList.push({ id: doc.id, ...doc.data() });
      });
      setProjects(projectList);
    }
    getProgect();
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
        marginTop: 10
      }
      }>
        <TextField id="outlined-basic" label="Search" variant="outlined" style={{ width: 400 }}
          value={sValue}
          onChange={(e) => {
            setSvalue(e.target.value.toLowerCase())

          }} />
        <Button
          onClick={() => { dispatch(setView('ProjectReport')) }}
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

        {(role === "admin" && (
          <>
            <Button
              onClick={() => { dispatch(setView('ProjectReport')) }}
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

        marginTop: 10
      }
      }>
        <Stack spacing={4}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {projects.map((pro) => (

              <Grid item xs={4} >
                <Box sx={{ width: 350, minHeight: 150 }}>
                  <Card>
                    <CardContent
                      component="img"
                      src={pro.image}
                     
                      width={"500"}
                      sx={{ height: '300px', scale: '1', transition: 'transform 0.3s ease' }}
                    />
                    <CardContent>
                      <Typography sx={{ fontSize: 18 }} gutterBottom>
                        {pro.name}
                      </Typography>
                    </CardContent>
                    <CardActions>

                      <Button size="small" onClick={() => { des(pro._id) }}>Learn More</Button>

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
            {projectName === "" ||
              date === "" ||
              description === "" ||
              projectName === null ||
              date === null ||
              description === null ? (
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
