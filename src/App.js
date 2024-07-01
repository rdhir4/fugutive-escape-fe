import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography, Box, Modal, Button, CssBaseline, ThemeProvider } from '@mui/material';
import CitySelection from './components/CitySelection/CitySelection';
import VehicleSelection from './components/VehicleSelection/VehicleSelection';
import './App.css';
import { DarkTheme } from './themes/DarkTheme';

const App = () => {
    const cops = ['Cop 1', 'Cop 2', 'Cop 3'];
    const [citySelections, setCitySelections] = useState({});
    const [vehicleSelections, setVehicleSelections] = useState({});
    const [result, setResult] = useState(null);

    const handleCitySelect = (cop, city) => {
        setCitySelections({ ...citySelections, [cop]: city });
    };

    const handleVehicleSelect = (cop, vehicle) => {
        setVehicleSelections({ ...vehicleSelections, [cop]: vehicle });
        if (Object.keys(vehicleSelections).length === cops.length) {
            determineResult();
        }
    };

    const determineResult = async () => {
        // const foundCop = await fugitiveService.findFugitive(citySelections, vehicleSelections);
        setResult(true);
    };

    return (
        <ThemeProvider theme={DarkTheme}>
            <CssBaseline />
            <Container>
                <Box my={4} textAlign="center">
                    <Typography variant="h3" component="h1" gutterBottom>
                        Fugitive Capture Game
                    </Typography>
                    <Typography variant="h6">
                        Select a city and vehicle for each cop to find the fugitive.
                    </Typography>
                </Box>
                <Grid container spacing={3} justifyContent="center">
                    {cops.map(cop => (
                        <Grid item key={cop} xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: '20px' }}>
                                <Typography variant="h5">{cop}</Typography>
                                <CitySelection cop={cop} onCitySelect={handleCitySelect} />
                                {citySelections[cop] && (
                                    <VehicleSelection
                                        cop={cop}
                                        distance={citySelections[cop].distance}
                                        onVehicleSelect={handleVehicleSelect}
                                    />
                                )}
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
                {result && (
                    <Modal open={true} onClose={() => setResult(null)}>
                        <Box sx={{ ...modalStyle }}>
                            <Typography variant="h6" component="h2">
                                Result
                            </Typography>
                            <Typography>{result}</Typography>
                            <Button onClick={() => setResult(null)}>Close</Button>
                        </Box>
                    </Modal>
                )}
            </Container>
        </ThemeProvider>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default App;
