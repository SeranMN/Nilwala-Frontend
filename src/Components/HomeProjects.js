import { useState, useEffect, forwardRef, React } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const HomeProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/project")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#373e98',
    textAlign: 'center',

  }));
  return (
    <div style={{ backgroundColor: '#CCCCCC', padding: '2px', height: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} sx={{ justifyContent: 'center', margin: 'auto' }}>
          {projects.map((pro) => (
            <>
              <Grid item xs={12} md={5} lg={4} paddingRight={2}>
                <>
                  <Grid>
                    <Card sx={{ margin: '2px', height: '400px', width: '500px' }} >
                      <Card>
                        <CardMedia
                          component="img"
                          src={pro && pro.avatar}
                          alt="Live from space album cover"
                          sx={{ height: '300px', scale: '1' }}
                        />
                      </Card>
                      <Grid >
                        
                        <Typography variant="h3" sx={{ textAlign: 'center', mt: '20px', textDecoration: 'bold' }} color='#0e0569' >
                          {pro.name}
                        </Typography>
                        
                      </Grid>

                    </Card>
                  </Grid>
                </>
              </Grid>
            </>

          ))}
        </Grid>
      </Box>
    </div>

  );
};

export default HomeProjects;
