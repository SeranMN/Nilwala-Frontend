import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Typography } from '@mui/material'
import { Box } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router'

const ViewUpcomingEvent = () => {
    const params = useParams()
    const [event, setEvent] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:5000/eventScheduling/viewevent/${params.id}`)
            .then((res) => {
                setEvent(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const formatTime = (time) => {
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const handleClick = () => {
        navigate('/')
    }

    return (
        <div>
            <Box sx={{ display: 'flex', m: '5px' }}>
                <Button onClick={handleClick} variant="contained" startIcon={<ArrowBackIcon />}>
                    Back
                </Button>
                <Typography sx={{m: 'auto'}} variant='h4' >{event && event.eventName}</Typography>
            </Box>
            <Box>
                
                <img style={{ height: '500px', width: '60%', objectFit: 'cover', marginTop: '10px' }} src={event && event.avatar ? event.avatar : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'} />
                <Box sx={{ display: 'flex', justifyContent: 'space-around', marginLeft: '450px', marginRight: '450px' }}>
                    <Typography variant='h5' mt={4}>Date : {event && (new Date(event.date).getMonth() + 1) + '/' +
                        (new Date(event.date).getDate()) + '/' + (new Date(event.date).getFullYear())}
                    </Typography>
                    <Typography variant='h5' mt={4}>Time : {event && formatTime(new Date(event.time))}
                    </Typography>
                </Box>
                <Typography variant='h6' mt={1} paragraph>
                    {event && event.description}
                </Typography>
            </Box>
        </div>
    )
}

export default ViewUpcomingEvent