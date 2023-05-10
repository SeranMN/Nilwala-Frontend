import React from 'react'
import Button from '@mui/material/Button';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useDispatch } from 'react-redux';
import { setView } from '../../store/reducers/containerReducer'; 

const MemberGenerateReport = () => {

    const dispatch = useDispatch()
    const handleSubmit = () => {
        dispatch(setView('BoardMembersReport'))
    }

    return (
        <>
            <Button onClick={handleSubmit} sx={{backgroundColor:'#757ce8'}} variant="contained" size="medium" startIcon={<AssignmentIcon />}>Reports</Button>
        </>
    )
}

export default MemberGenerateReport