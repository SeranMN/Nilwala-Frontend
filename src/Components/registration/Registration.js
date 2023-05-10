import { React, useState, forwardRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar"
const Registration = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLAstName] = useState('');
  const [dob, setDob] = useState();
  const [email, setEmail] = useState();
  const [occupation, setOccupation] = useState();
  const [gender, setGender] = useState();
  const [city, setCity] = useState();
  const [pwd, setPwd] = useState();
  const vertical = 'bottom'
  const horizontal = 'right'


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
  const onSubmit = () => {

    const user = {
      firstName:firstName,
      lastName:lastName,
      dob:dob,
      email:email,
      occupation:occupation,
      gender:gender,
      city:city
    }
    
    axios.post('http://localhost:5000/user/add', user)
      .then(() => {
      setMsg("Successfully Added user");
        SetSeverity("success");
        setOpenSnack(true);
      }).catch((err) => {
      setMsg("oops! Somthing Went Wrong");
        SetSeverity("error");
        setOpenSnack(true);
        console.log(err);
    })
  }
  return (
    <div style={{ backgroundColor: "#0e0569", height: "1000px" }}>
      <Box
        component="span"
        sx={{
          mx: "100px",
          my: "20px",
          transform: "scale(1.0)",
          backgroundColor: "white",
        }}
      >
        <Card sx={{ width: 650, mx: "30% " }}>
          <CardContent
            component="img"
            src="/clublogo.png"
            height={"100"}
            width={"100"}
          />

          <Typography variant="h3" component="div">
            Registration
          </Typography>

          <CardContent>
            <TextField
              id="filled-basic"
              label="First Name"
              variant="filled"
              sx={{ width: 300, paddingRight: 2 }}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
            <TextField
              id="filled-basic"
              label="Last Name"
              variant="filled"
              sx={{ width: 300 }}
              value={lastName}
              onChange={(e) => {
                setLAstName(e.target.value)
              }}
            />
          </CardContent>

          <CardContent>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              style={{ width: 600 }}
            >
              <DatePicker
                label="Date of Birthday"
                value={dob}
                onChange={(e) => {
                  setDob(e.target.value);
                }}
                style={{ width: 600 }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </CardContent>

          <CardContent>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              type={"email"}
              sx={{ width: 600 }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            
          </CardContent>
                  <CardContent>
                      <TextField
              id="filled-basic"
              label="Occupation"
              variant="filled"
              sx={{ width: 600 }}
              value={occupation}
              onChange={(e) => {
                setOccupation(e.target.value)
              }}
            />
                </CardContent>
          <CardContent>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormLabel>Gender: </FormLabel>
              <FormControlLabel
                value="female"
                control={<Radio onChange={(e) => {
                  setGender('female')
                }} />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio onChange={(e) => {
                  setGender('male')
                }} />} label="Male" />
            </RadioGroup>
</CardContent>
          <CardContent>
            <TextField
              id="filled-basic"
              label="City"
              variant="filled"
              sx={{ width: 600 }}
              value={city}
              onChange={(e) => {
                setCity(e.target.value)
              }}
            />
          </CardContent>

          <CardContent>
            <TextField
              id="filled-basic"
              label="Password"
              variant="filled"
              type={'password'}
              sx={{ width: 600 }}
              value={pwd}
              onChange={(e) => {
                setPwd(e)
              }}
            />
          </CardContent>
         
          <CardContent>
            <FormControlLabel
              control={<Checkbox />}
              label="Agree to Terms and Conditions"
            />
          </CardContent>
          <CardContent>
            <Button onClick={onSubmit} variant="contained" sx={{ width: 500, height: 40 }}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </Box>
   
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        key ={'bottomright'}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={severity}
          sx={{ width: "100%" }}
          key ={vertical+horizontal}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Registration;
