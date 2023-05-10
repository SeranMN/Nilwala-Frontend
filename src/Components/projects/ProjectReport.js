import {React,useState,useEffect} from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import axios from 'axios';
const ProjectReport = () => {

    function CustomToolbar() {
        return (
            <GridToolbarContainer>
                <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
            </GridToolbarContainer>
        );
    }

     const [projects, setProjects] = useState([]);

    useEffect(() => {
    axios
      .get("http://localhost:5000/project")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
    }, []);
    
    
  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      editable: true,
    },

    {
      field: "Date",
      headerName: "Date",
      width: 200,
      editable: true,
    },
    {
      field: "Description",
      headerName: "Description",
      width: 255,
    }
    
  ];
  return (
      <div>
          <DataGrid
              components={{
                Toolbar: CustomToolbar
              }}
              getRowId={(project) => project._id}
              rows={projects}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              sx={{height:500}}
            />
    </div>
  )
}

export default ProjectReport