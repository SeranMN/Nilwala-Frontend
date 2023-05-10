import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { setMonth } from '../../store/reducers/filterEventReducer';
import { useSelector } from 'react-redux';

const FilterMonth = () => {
    const month = useSelector(state => state.filterEvents.month)
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(setMonth(event.target.value))
    };
  return (
    <Box sx={{  }}>
    <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Month</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={month}
            label="Event Status"
            onChange={handleChange}
        >
            <MenuItem value={''}>None</MenuItem>
            <MenuItem value={1}>January</MenuItem>
            <MenuItem value={2}>February</MenuItem>
            <MenuItem value={3}>March</MenuItem>
            <MenuItem value={4}>April</MenuItem>
            <MenuItem value={5}>May</MenuItem>
            <MenuItem value={6}>June</MenuItem>
            <MenuItem value={7}>July</MenuItem>
            <MenuItem value={8}>August</MenuItem>
            <MenuItem value={9}>September</MenuItem>
            <MenuItem value={10}>October</MenuItem>
            <MenuItem value={11}>November</MenuItem>
            <MenuItem value={12}>December</MenuItem>
        </Select>
    </FormControl>
</Box>
)}

export default FilterMonth