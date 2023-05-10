import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
//import { Card } from '@material-ui/core';
import {Card} from '@mui/material';


function Fullviewblog() {

    const [blog,setblog] = useState();
    const params = useParams()

    useEffect(()=>{

        function getBlogs(){
            axios.get(`http://localhost:5000/blogs/get/${params.id}`).then((res) =>{
            console.log(res.data, "Data"); 
            setblog(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getBlogs();
    }, [])



  return (
    <div>
        
        <div className='listofblogs'>
        <Card style={{maxWidth:950, marginTop:20, padding:"10px 0px", borderStyle:"outset"}}>
        
            
                <div>
              
                 <h3 style={{textAlign:'center', fontSize:30, fontWeight:'bold'}}>{blog && blog.title}</h3>
                <h3 style={{marginTop:50, textAlign:'left'}}>{blog && blog.content}</h3> 
                </div>  
                
            
       
        </Card>
    </div>
    </div>
  )
}

export default Fullviewblog