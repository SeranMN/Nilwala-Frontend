import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';

const Leaders = () => {

  const [members, setMembers] = useState([])
  const d = new Date();
  let year = d.getFullYear();

  useEffect(() => {
    function getBoardMembers() {
      axios.get(`http://localhost:5000/boardMembers/filter?year=${year}`).then((res) => {
        console.log(res.data)
        setMembers(res.data)
      }).catch((err) => {
        alert(err.message);
        console.log(err.message);
      })
    }
    getBoardMembers()

  }, [])

  return (
    <div style={{ backgroundColor: '#373e98', padding: '2px', height: '100%' }}>
    <div style={{ m: '5px' }} >
      
        <Typography variant="h2"  sx={{ textAlign: 'center', mt: '35px', textDecoration: 'bold' }} color='white'>Our Leaders</Typography>
      <Box sx={{ width: '75%', justifyContent: 'center', margin: 'auto', mt: 2 ,paddingBottom:'px'}}>
        <Grid sx={{ justifyContent: 'center', margin: 'auto' }} container spacing={1}>
          {members.map((member, index) => (
            <Grid item xs={12} md={8} lg={4}>
              <Card sx={{ maxWidth: 360, mt: 4, backgroundColor: '#0e0569' }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={member.avatar}
                  alt="Paella dish"
                />
                <CardHeader
                  sx = {{color:'white'}}
                  title={member.boardMemberName}
                  
                />
                <Typography sx={{ color: '#99ffff' }}>{member.designation}</Typography>
              </Card>
            </Grid>

          ))}
        </Grid>
      </Box>
</div>
    </div>
  )
}

export default Leaders