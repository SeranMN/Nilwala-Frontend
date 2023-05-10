import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setDesignation } from '../../store/reducers/filterBoardMembersReducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const Designation = () => {
    const designation = useSelector(state => state.filterBoards.designation)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(setDesignation(event.target.value));
    };

    return (
        <Box sx={{  }}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Designation</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={designation}
                    label="Event Status"
                    onChange={handleChange}
                >
                    <MenuItem value={''}>None</MenuItem>
                    <MenuItem value={'Secretary'}>Secretary</MenuItem>
                    <MenuItem value={'Treasurer'}>Treasurer</MenuItem>
                    <MenuItem value={'President'}>President</MenuItem>
                    <MenuItem value={'Member'}>Member</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default Designation