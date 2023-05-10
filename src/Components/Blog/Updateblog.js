import axios from 'axios';
import React,  { useEffect, useState }  from 'react'
import Swal from 'sweetalert2'

function Updateblog() {


    const [listofblogs,setListofblogs] = useState([]);
    
   const updatelistofblogs = (id) => {

    const newBlog = prompt("Enter New Content:");

    
    axios.put("http://localhost:5000/blogs/update", {newBlog: newBlog, id: id}).then(()=>{
        Swal.fire(
            'Successful!',
            'Blog Updated',
            'success'
          )
        setListofblogs(listofblogs.map((value)=>{
             // eslint-disable-next-line
            return value._id == id ? {_id: id, title: value.title, name: value.name, content: newBlog  }: value
        }))
    })
   };

   const DeletelistofBlogs = (id) => {
    axios.delete(`http://localhost:5000/blogs/delete/${id}`).then(()=>{
        Swal.fire(
            'Successful!',
            'Blog Deleted',
            'success'
          )
        setListofblogs(listofblogs.filter((value)=>{
             // eslint-disable-next-line
            return value._id != id;
        }))
    })
   }

   useEffect(()=>{

    function getBlogs(){
        axios.get("http://localhost:5000/blogs").then((res) =>{
            setListofblogs(res.data);
        }).catch((err)=>{
            alert(err.message);
        })
    }
    getBlogs();
}, [])



  return (
    <div className='listofblogs'>
        <h1>Update/Delete Blogs</h1>
        {listofblogs.map((value)=>{
            return(
                <div className='blogContainer'>
              <div key={value.id} className="blog">
                <h3>Blog Title:{value.title}</h3>
                <h3>Author:{value.name}</h3>
                </div>
                <button onClick={() => {
                 updatelistofblogs(value._id)
                }}>Update</button> 
                <button onClick={() => {
                 DeletelistofBlogs(value._id)
                 }}>Delete</button> 
                </div>
            );
        })}
    </div>
  )
}

export default Updateblog