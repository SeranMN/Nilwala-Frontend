import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { getDocs, collection, orderBy } from "firebase/firestore";
import { firestore } from './Firebase';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Instagram } from '@mui/icons-material';
import { LinkedIn } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';
// Add other social media icons if needed



const Leaders = () => {

  const [members, setMembers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const d = new Date();
  let year = d.getFullYear();

  useEffect(() => {
    const getLeaders = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "leaders"),
          orderBy("order", "desc")
        );
        const projectList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMembers(projectList);
        setIsLoaded(true)
      } catch (error) {
        console.error("Error fetching leaders:", error);
      }
    };


    getLeaders();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const projectsElements = document.querySelectorAll(".project-card");
      const fadeInInterval = 100; // Adjust the interval (in milliseconds) between each increment in opacity

      projectsElements.forEach((project, index) => {
        let opacity = 0;
        project.style.opacity = opacity;

        const fadeInAnimation = () => {
          opacity += 0.05; // Adjust the increment value for smoother or faster animation
          project.style.opacity = opacity;

          if (opacity < 1) {
            requestAnimationFrame(fadeInAnimation);
          }
        };

        setTimeout(() => {
          requestAnimationFrame(fadeInAnimation);
        }, fadeInInterval * index);
      });
    }
  }, [isLoaded]);


  return (
    
     
    <div style={{ backgroundColor: '#0C243C', padding: '2px', height: '100%' }}>
      <div style={{ m: '5px' }} >

        <Typography variant="h2" sx={{ textAlign: 'center', mt: '35px', textDecoration: 'bold' }} color='#55C2C3'>Our Leaders</Typography>
        <Box sx={{ width: '75%', justifyContent: 'center', margin: 'auto', mt: 2, paddingBottom: 'px' }}>
          <Grid sx={{ justifyContent: 'center', margin: 'auto' }} container spacing={1}>
            {isLoaded ? (
              
                members.map((member, index) => (
                  <Grid item xs={12} md={8} lg={4} key={index}>
                    <Card className="project-card" sx={{ height: 500, maxWidth: 360, mt: 4, backgroundColor: '#0e0569', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                      <CardMedia
                        component="img"
                        sx={{ height: '300px', transition: 'transform 0.3s ease' }}
                        image={member.image}
                        alt="Paella dish"
                      />
                      <CardHeader
                        sx={{ color: 'white' }}
                        title={member.designation}
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{ color: '#99ffff' }}>{member.name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#99ffff' }}>
                          <PhoneIcon sx={{ marginRight: '4px' }} />
                          <Typography>{member.tno}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#99ffff' }}>
                          <EmailIcon sx={{ marginRight: '4px' }} />
                          <Typography>{member.email}</Typography>
                        </Box>
                        {/* Add more social media icons if needed */}
                        <Box sx={{ display: 'flex', alignItems: 'center', color: '#99ffff' }}>


                          <a href={member.facebook} target="_blank" rel="noopener noreferrer">
                            <FacebookIcon sx={{ marginRight: '4px' }} />
                          </a>
                          <a href={member.twitterLink} target="_blank" rel="noopener noreferrer">
                            <Instagram sx={{ marginRight: '4px' }} />
                          </a>
                          <a href={member.twitterLink} target="_blank" rel="noopener noreferrer">
                            <LinkedIn sx={{ marginRight: '4px' }} />
                          </a>

                        </Box>
                      </Box>
                    </Card>

                  </Grid>
                ))) : (
                
              <Box sx={{ height: '100vh' }}>
                <Box sx={{ width: 300 }}>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={true} />
                </Box>
                <Box sx={{ width: 300, height: '100vh' }}>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={true} />
                </Box><Box sx={{ width: 300, height: '100vh' }}>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={true} />
                </Box>
              </Box>
                
            )}
              
              

          </Grid>
          
        </Box>
      </div>
    </div>
  )
}

export default Leaders