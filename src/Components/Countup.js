import { useEffect, useState } from 'react';
import { Box, Grid } from '@mui/material';
import React from 'react'
import CountUp from 'react-countup';
import Typography from '@mui/material/Typography';
import AOS from 'aos';
import 'aos/dist/aos.css';
import VisibilitySensor from "react-visibility-sensor";

const Countup = () => {

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <Box sx={{
            width: '100%',
            height: 300,
            background:'linear-gradient(250deg, #005C97 0%, #363795 40%, #005C9 100%)',
            
        }}
        >
            <Grid container pt={6}>
                <Grid item md={4} xs={12} data-aos="fade-right" data-aos-duration="1000">
                    <img src="/project.png" style={{ height: '50px' }} />
                    <Typography variant="h3" component="div" color='White' gutterBottom >
                        PROJECTS
                    </Typography>
                    <CountUp
                        start={0}
                        end={200}
                        duration={2}
                        decimal=","
                        suffix='+'
                    >
                        {({ countUpRef, start }) => (
                            <VisibilitySensor
                                onChange={start}
                            >
                                <span style={{ fontSize: '30px', color: 'White' }} ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                </Grid>
                <Grid item md={4} xs={12} data-aos="fade-right" data-aos-duration="1000">
                    <img src="/award.png" style={{ height: '50px' }} />
                    <Typography variant="h3" component="div" color='White' gutterBottom>
                        AWARDS
                    </Typography>
                    <CountUp
                        start={0}
                        end={100}
                        duration={2}
                        decimal=","
                        suffix='+'
                    >
                        {({ countUpRef, start }) => (
                            <VisibilitySensor
                                onChange={start}
                            >
                                <span style={{ fontSize: '30px', color: 'White' }} ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                </Grid>
                <Grid item md={4} xs={12} data-aos="fade-right" data-aos-duration="1000">
                    <img src="/proile.png" style={{ height: '50px' }} />
                    <Typography variant="h3" component="div" color='White' gutterBottom>
                        MEMBERS
                    </Typography>
                    <CountUp
                        start={0}
                        end={100}
                        duration={2}
                        decimal=","
                        suffix='+'
                    >
                        {({ countUpRef, start }) => (
                            <VisibilitySensor
                                onChange={start}
                            >
                                <span style={{ fontSize: '30px', color: 'White' }} ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Countup