import * as React from 'react';
import { Box, Card, CardMedia } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


export default function CircularIntegration() {




    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Card
                    sx={{
                        margin: '2px',
                        height: '300px',
                        width: '360px',
                        position: 'relative',
                        overflow: 'hidden',
                        bgcolor: 'transparent', // Set background color to transparent
                    }}
                >
                    <CardMedia
                        component="img"
                        src={'logo.png'}
                        alt="Live from space album cover"
                        sx={{
                            height: '300px',
                            width: '100%',
                            display: 'block',
                            mx: 'auto', // Center the image horizontally
                            transition: 'transform 0.3s ease',
                        }}
                    />
                </Card>

                <CircularProgress
                    size={68}
                    sx={{
                        color: green[500],
                        position: 'absolute',
                        top: -6,
                        left: -6,
                        zIndex: 1,
                    }}
                />

            </Box>
        </Box>
    );
}
