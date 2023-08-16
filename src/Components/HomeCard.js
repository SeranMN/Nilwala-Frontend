import React, { useEffect } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AOS from 'aos';
import 'aos/dist/aos.css';


const HomeCards = () => {

  const theme = useTheme();

  useEffect(() => {
    AOS.init();
  }, [])

  return (
    <Card sx={{ backgroundColor: '#0C243C', mt: '30px' }}>
      <Typography variant="h2" color='#55C2C3' mt={4} >
        Welcome to the official Web page of Leo Club of Matara Nilwala! 

      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} md={4} lg={2}>
          <CardMedia
            component="img" 
            src="/logo.png"
            alt="Live from space album cover"
          />
        </Grid>
        <Grid item xs={12} sm={5} md={4} lg={10} padding={2} data-aos="fade-right" data-aos-duration="1000">
          <Typography variant="h6" sx={{ textAlign: 'justify', mt: '35px', fontStyle: 'italic' }} color='#55C2C3' paragraph>
            Established in 2019, we have embarked on a remarkable journey of service and compassion. Over the years, we have successfully completed 200+ projects, leaving a lasting impact on the society we serve.


            Our dedicated club members are driven by the common goal of uplifting our community's standards and making a positive difference. We actively address the needs of the less fortunate, promote education, empower youth, and foster unity among our fellow citizens.

            Join us with the Leo Movement to create sustainable change and improve lives. Stay connected with our page to stay updated on upcoming events, projects, and opportunities to get involved. Together, we can create a brighter future for everyone.
          </Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default HomeCards