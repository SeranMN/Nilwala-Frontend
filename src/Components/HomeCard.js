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
    <Card sx={{ background:'linear-gradient(133deg, #005C97 0%, #363795 100%)', mt: '30px' }}>
      <Typography fontFamily={'Poppins'} variant="h2" color='white' mt={4} >
        LEO CLUB OF MATARA NILWALA 
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={7} md={4} lg={2}>
          <CardMedia
            component="img" 
            src="/leo.png"
            alt="Live from space album cover"
          />
        </Grid>
        <Grid item xs={10} sm={5} md={4} lg={8} padding={2} data-aos="fadeInAnimation" data-aos-duration="1000">
          <Typography variant="h6" sx={{fontFamily:'Poppins', textAlign: 'justify', mt: '35px', fontSize:'calc(1vw + 5px)' }} color='white' paragraph>
            Established in 2019, we have embarked on a remarkable journey of service and compassion. Over the years, we have successfully completed 200+ projects, leaving a lasting impact on the society we serve.
          </Typography>
          <Typography variant="h6" sx={{ fontFamily:'Poppins',textAlign: 'justify', mt: '35px', fontSize:'calc(1vw + 5px)' }} color='white' paragraph>
            Our dedicated club members are driven by the common goal of uplifting our community's standards and making a positive difference. We actively address the needs of the less fortunate, promote education, empower youth, and foster unity among our fellow citizens.
          </Typography>
          <Typography variant="h6" sx={{ fontFamily:'Poppins',textAlign: 'justify', mt: '35px', fontSize:'calc(1vw + 5px)' }} color='white' paragraph>
            Join us with the Leo Movement to create sustainable change and improve lives. Stay connected with our page to stay updated on upcoming events, projects, and opportunities to get involved. Together, we can create a brighter future for everyone.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={7} md={4} lg={2}>
          <CardMedia
            component="img"
            src="/logo.png"
            alt="Live from space album cover"
            style={{border: '5px', solid: '#555', color:'white'}}
          />
        </Grid>
      </Grid>
    </Card>
  )
}

export default HomeCards