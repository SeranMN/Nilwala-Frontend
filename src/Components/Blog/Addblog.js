import React, { useState } from 'react'
//import {Card, CardContent, Grid, Typography, TextField, Button } from '@material-ui/core'
import {Card, TextField, Grid, Typography, Button, CardContent} from '@mui/material'
import axios from 'axios'
import Swal from 'sweetalert2'


function Addblog() {

    const [title,setTitle]=useState("");
    const [name,setName]=useState("");
    const [content,setContent]=useState("");
    
    function sendData(e){
    
        e.preventDefault();
    
        const newBlog = {
            title,
            name,
            content
        }
    
        axios.post("http://localhost:5000/blogs/add", newBlog).then(()=>{
            Swal.fire(
                'Blog Published!',
                'Thank You!',
                'success'
              )
        }).catch((err)=>{
            alert(err);
        })
    }





  return (
    <div>
        <Card style={{maxWidth:850, margin:"0 auto", marginTop:20, marginBottom:20, padding:"20px 0px", borderStyle:"outset"}}>
            <CardContent>
                <Typography style={{ marginBottom:20, fontWeight:'bold', fontSize:20}}>Add New Blog</Typography>

                <form>
                 <Grid container spacing={1}>

                     <Grid xs={12}  item>
                         <TextField label="Blog Title" placeholder='Enter Blog Title' variant='outlined' fullWidth required onChange={(e)=>{
                       
                       setTitle(e.target.value);

                    }}/>
                     </Grid>
                     <Grid xs={12} item>
                         <TextField  label="Author Name" placeholder="Enter Author's Name" variant='outlined' fullWidth required onChange={(e)=>{
                       
                       setName(e.target.value);

                    }}/>

                     </Grid>
                     <Grid xs={12} item>
                     <TextField label="Content" multiline rows={15} placeholder='Enter Blog Content' variant='outlined' fullWidth required onChange={(e)=>{
                       
                       setContent(e.target.value);

                    }}/>
                     </Grid>
                     <Grid xs={12} item>
                     <Button type="submit" variant='contained' sx={{mt: 3}} color='primary' onClick={sendData}>Publish</Button>
                     </Grid>

                 </Grid>
                 </form>

            </CardContent>

        </Card>
    </div>
  )
}

export default Addblog