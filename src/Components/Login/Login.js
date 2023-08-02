import { React, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { auth } from '../Firebase';
import signInWithEmailAndPassword from "firebase/auth";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState();

  const login = () => {
    auth.signInWithEmailAndPassword(email, pwd)
    
  
  }

  return (
      <div style={{ backgroundColor: "#0e0569", height: "100vh" }}>
      <Box
        component="span"
        sx={{
          mx: "100px",
          my: "20px",
          transform: "scale(0.8)",
        }}
      >
        <Card sx={{ width: 400, mx: "70%", my: "10%", height: "50%" }}>
          <CardContent>
            <Typography variant="h4">Login</Typography>
          </CardContent>
          <CardContent>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              sx={{ width: 300 }}
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </CardContent>
          <CardContent>
            <TextField
              id="filled-basic"
              label="Password"
              variant="filled"
              sx={{ width: 300 }}
              value={pwd}
              onChange={(e) => { setPwd(e.target.value) }}
            />
          </CardContent>
          <CardContent>
            <Button variant="contained" color="success" sx={{ width: 300 }} onClick = {login} >
              Login
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default Login;
