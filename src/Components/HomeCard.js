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
    <Card sx={{ backgroundColor: '#0e0569', mt: '30px' }}>
      <Typography variant="h2" color='white' mt={4} >
        Get to Know us
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <CardMedia
            component="img" 
            src="/logo.png"
            alt="Live from space album cover"
          />
        </Grid>
        <Grid item xs={9} paddingRight={15} data-aos="fade-right" data-aos-duration="1000">
          <Typography variant="h6" sx={{ textAlign: 'justify', mt: '35px', fontStyle: 'italic' }} color='white' paragraph>
            Leo clubs are a youth organization of Lions club International. The word
            “LEO” stands for LEADERSHIP, EXPERIENCE AND
            OPPORTUNITY.
            Leo clubs encourage youths to develop leadership qualities by participating in social service activities. They are dependent on a Lions club to sponsor and initiate a Leo club. They conduct various projects in the fields of Healthcare, Elders, children and Disabled people, Literacy and Education and Self-development.
            The Leo club of Royal College was established under the guidance of Senior Games Master Mr. Riyaz Aluher and PDG Lion Dr.Lasantha Gunawardana MJF (District Chairman for Leos). The College club falls under the premises of Leo District 306 C2. Together with the members including the Executive committee, we hope to uphold the college dignity and pride throughout the
            Leoistic year.
          </Typography>
        </Grid>
      </Grid>
    </Card>
  )
}

export default HomeCards