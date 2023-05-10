import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { setYear } from '../../store/reducers/filterBoardMembersReducer';
import { useSelector } from 'react-redux';

const MemberYearFilter = () => {
    const year = useSelector(state => state.filterBoards.year)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(setYear(event.target.value))
    };

    return (
        <Box sx={{  }}>
            <FormControl fullWidth size="small">
                <InputLabel id="demo-simple-select-label">Year</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={year}
                    label="Event Status"
                    onChange={handleChange}
                >
                    <MenuItem value={''}>None</MenuItem>
                    <MenuItem value={'2024'}>2024</MenuItem>
                    <MenuItem value={'2023'}>2023</MenuItem>
                    <MenuItem value={'2022'}>2022</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default MemberYearFilter