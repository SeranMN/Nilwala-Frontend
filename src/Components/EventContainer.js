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

           
        </div>
    )
}

export default EventContainer