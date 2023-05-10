import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { setStatus } from '../../store/reducers/filterEventReducer';
import { useSelector } from 'react-redux';

const FilterStatus = ({report}) => {
    const status = useSelector(state => state.filterEvents.status)

    const dispatch = useDispatch()
    const handleChange = (event) => {
        dispatch(setStatus(event.target.value))
    };

    return (
        <Box sx={{  }}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Event Status</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Event Status"
                    onChange={handleChange}
                >
                    
                    <MenuItem value={""}>None</MenuItem>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Publish"}>Publish</MenuItem>
                    {report &&
                        <MenuItem value={"Cancel"}>Cancelled</MenuItem>
                    }
                </Select>
            </FormControl>
        </Box>
    )
}

export default FilterStatus