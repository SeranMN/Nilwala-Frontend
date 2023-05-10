import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import EventCard from './EventCard';


const EventList = ({ events,toggle,setToggle }) => {

    return (
        <>
            <Grid container spacing={3}>
                {events.map((event, index) => (
                    <Grid sx={{ mt: 3}} item xs={12} md={8} lg={4} >
                        <EventCard event={event} setToggle={setToggle} toggle={toggle}/>
                    </Grid>

                ))}
            </Grid>
        </>
    )
}

export default EventList