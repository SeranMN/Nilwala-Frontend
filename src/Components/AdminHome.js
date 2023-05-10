import React,{useState} from 'react'
import Chart from './Chart';
import Deposits from './Deposits';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import UpcommingEvents from './UpcommingEvents';
import { Box } from '@mui/system';

const AdminHome = () => {
    const [value, onChange] = useState(new Date());

    return (
        <>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <div style={{ width: '100%', textAlign: 'center', backgroundColor: '#9e9e9e', fontSize: '20px', fontWeight: 'bold' }}>
                        Upcoming Events
                    </div>
                    <Box
                        sx={{
                            width: '100%',
                            // display:'flex',
                            // justifyContent:'space-between',
                            // alignItems: 'center',
                            display: "grid",
                            gridTemplateColumns: '2fr 2fr ',
                            boxSizing: 'border-box'
                        }}>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
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
                    </Box>
                </Paper>
            </Grid>
        </>
    )
}

export default AdminHome