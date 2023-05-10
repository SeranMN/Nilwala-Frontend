import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import EventIcon from '@mui/icons-material/Event';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { useDispatch } from 'react-redux';
import { setView } from '../store/reducers/containerReducer';

const MainListItems = ({ setHeader }) => {
    const dispatch = useDispatch()

    return (
        <>
            <ListItemButton onClick={() => {
                setHeader("Dashboard")
                dispatch(setView('AdminHome'))
            }}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => {
                setHeader("Projects")

                dispatch(setView('Projects'))

            }}>
                <ListItemIcon>
                    <DriveFolderUploadIcon />
                </ListItemIcon>
                <ListItemText primary="Projects" />
            </ListItemButton>
            <ListItemButton onClick={() => {
                setHeader("Board Members")
                dispatch(setView('ViewBoardMembers'))
            }}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Board Members" />
            </ListItemButton>
            <ListItemButton onClick={() => {
                setHeader("Blogs")
                dispatch(setView('Updateblog'))
            }}>
                <ListItemIcon>
                    <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Blogs" />
            </ListItemButton>
            <ListItemButton onClick={() => {
                setHeader("Events")
                dispatch(setView('EventScheduling'))
            }}>
                <ListItemIcon>
                    <EventIcon />
                </ListItemIcon>
                <ListItemText primary="Events" />
            </ListItemButton>

        </>
    )
}

export default MainListItems

// export const secondaryListItems = (
//     <React.Fragment>
//         <ListSubheader component="div" inset>
//             Saved reports
//         </ListSubheader>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Current month" />
//         </ListItemButton>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Last quarter" />
//         </ListItemButton>
//         <ListItemButton>
//             <ListItemIcon>
//                 <AssignmentIcon />
//             </ListItemIcon>
//             <ListItemText primary="Year-end sale" />
//         </ListItemButton>
//     </React.Fragment>
// );