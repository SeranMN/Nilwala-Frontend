import React, { useState } from 'react'
import Stack from '@mui/material/Stack';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import UpcommingEvents from './UpcommingEvents';
import { Box } from '@mui/system';
import UpcomingSlider from './SlideShow/UpcomingSlider';

const EventContainer = () => {
    const [value, onChange] = useState(new Date());

    return (
        <div>
            <div style={{ width: '100%', textAlign: 'center', backgroundColor: '#9e9e9e', fontSize: '20px', fontWeight: 'bold' }}>
                Upcoming Events
            </div>

            <UpcomingSlider />

            {/* <Box
                sx={{
                    width: '100%',
                    // display:'flex',
                    // justifyContent:'space-between',
                    // alignItems: 'center',
                    display: "grid",
                    gridTemplateColumns: '2fr 2fr 2fr',
                    boxSizing: 'border-box'
                }}>
                <img src="/event.gif" style={{ marginRight: '10px', alignSelf: 'center', justifySelf: 'center', backgroundSize: 'cover' }} />
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'left',
                        boxSizing: 'border-box'
                    }}>
                    <UpcommingEvents />
                </Box>
                <Box
                    sx={{
                        m: 5
                    }}>
                    <Calendar onChange={onChange} value={value} />
                </Box>
            </Box> */}

        </div>
    )
}

export default EventContainer