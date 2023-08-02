import { Box, Typography, Card, CardMedia } from '@mui/material';
import React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

const ProLoader = () => {
    const [showText, setShowText] = React.useState(false);
    const text = "Nilwala Leos";
    const [displayedText, setDisplayedText] = React.useState("");

    React.useEffect(() => {
        // Set a timeout to start showing text after 1 second (1000ms)
        const timeout = setTimeout(() => {
            setShowText(true);
        }, 1000);

        return () => {
            // Clear the timeout when the component unmounts to avoid memory leaks
            clearTimeout(timeout);
        };
    }, []);
    let progress = 0
    React.useEffect(() => {
        if (showText) {
            let currentIndex = 0;
           

            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.slice(0, currentIndex));
                    currentIndex++;
                    progress += 10;
                } else {
                    clearInterval(interval);
                }
            }, 100); // Change the interval value to control the speed of typewriter effect

            return () => {
                // Clear the interval when the component unmounts to avoid memory leaks
                clearInterval(interval);
            };
        }
    }, [showText]);

    return (
        <Box height='100vh' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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

            <Typography sx={{ fontStyle: 'italic', fontStyle: 'bold', color: 'White' ,fontSize:64, opacity: showText ? 1 : 0, transition: 'opacity 1s' }}>
                {displayedText}
            </Typography>
            
        </Box>
    );
};

export default ProLoader;
