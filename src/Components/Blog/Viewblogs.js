import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React,{useState, useEffect} from 'react'
import "../Bstyles/listofblogs.css"
import {Button} from '@mui/material'
import TextField from "@mui/material/TextField";;
function Viewblogs() {

    const [SValue,setSValue] = useState('');
    const [listofblogs,setListoblogs] = useState([]);
    const navigate = useNavigate()
    useEffect(()=>{

        function getBlogs(){
            axios.get("http://localhost:5000/blogs").then((res) =>{
                setListoblogs(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getBlogs();
    }, [])

    const handleclick = ()=>{
        navigate('/fullviewblog/${id}')
    }


  return (
    <div className='listofblogs'>
        <h1>List Of Blogs</h1>
        <TextField id="outlined-basic" label="Search" variant="outlined" style={{ width: 400 }} 
        value = {SValue}
        onChange={(e) => {
          setSValue (e.target.value.toLowerCase())
          
          }} />

        <Button style={{maxWidth:110, maxHeight:45, marginLeft:900, marginTop:0, backgroundColor:"#32cd32"}} variant="contained" 
             href="http://localhost:3000/addblog">
              Add Blog
            </Button>
        {listofblogs.filter(listofblog=>listofblog.title.toLowerCase().includes(SValue)).map((value)=>{
            return(
                <div className='blogContainer'>
              <div key={value.id} className="blog">
                <h3>Blog Title:{value.title}</h3>
                <h3>Author:{value.name}</h3>
                </div>  
                <Button style={{maxWidth:10, maxHeight:40, marginLeft:10, marginTop:10}} variant="contained" color="primary"
             onClick={()=>navigate(`/fullviewblog/${value._id}`)}>
              More..
            </Button>
                </div>
            );
        })}
    </div>
  )
}

export default Viewblogs