import React, { useState } from "react";
import {
    Container,
    Grid,
    Paper,
    Typography,
    Box,
    Modal,
    Button,
    CssBaseline,
    ThemeProvider,
} from "@mui/material";
import CitySelection from "./components/CitySelection/CitySelection";
import VehicleSelection from "./components/VehicleSelection/VehicleSelection";
import "./App.css";
import { DarkTheme } from "./themes/DarkTheme";
import API from "./services/api";

const App = () => {
    const cops = [
        { id: 1, name: "Cop 1" },
        { id: 2, name: "Cop 2" },
        { id: 3, name: "Cop 3" },
    ];
    const [selections, setSelections] = useState({});
    const [result, setResult] = useState(null);
    const [vehicles, setVehicles] = useState([
        { id: 1, name: "EV Bike", range: 60, count: 2, image: "evBike.png" },
        { id: 2, name: "EV Car", range: 100, count: 1, image: "evCar.png" },
        { id: 3, name: "EV SUV", range: 120, count: 1, image: "evSuv.png" },
    ])

    const handleCitySelect = (cop, city) => {
        setSelections((prev) => ({ ...prev, [cop]: { city } }));
    };

    const handleVehicleSelect = (cop, vehicle) => {
        setSelections((prev) => {
            if (prev[cop] && prev[cop].vehicle && prev[cop].vehicle.id !== vehicle.id) {
                addVehicleCount(prev[cop].vehicle.id)
                reduceVehicleCount(vehicle.id)
            } else if (!prev[cop]?.vehicle) {
                reduceVehicleCount(vehicle.id)
            }
            return ({
                ...prev,
                [cop]: { ...prev[cop], vehicle },
            })
        });
    };

    const reduceVehicleCount = (vehicleId) => {
        setVehicles((prev) => {
            const newVehicles = prev.map((item) => {
                return vehicleId === item.id ? { ...item, count: item.count - 1 } : item
            })
            return newVehicles
        })
    }

    const addVehicleCount = (vehicleId) => {
        setVehicles((prev) => {
            const newVehicles = prev.map((item) => {
                return vehicleId === item.id ? { ...item, count: item.count + 1 } : item
            })
            return newVehicles
        })
    }

    const determineResult = async () => {
        const foundCop = await API.findFugitive(selections);
        console.log(foundCop)
        if (foundCop) {
            setResult(`${cops.find((item) => item.id === parseInt(foundCop)).name} Found the Fugitive!`);
        } else {
            setResult("Fugitive Escaped")
        }
    };

    const isBtnDisabled = () => {
        return !Object.keys(selections).length || Object.keys(selections).some((item) => {
           return !selections[item]?.vehicle
        }) 
    }

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
                    {cops.map((cop) => (
                        <Grid item key={cop} xs={12} sm={6} md={4}>
                            <Paper elevation={3} style={{ padding: "20px" }}>
                                <Typography variant="h5">{cop.name}</Typography>
                                <CitySelection
                                    cop={cop.id}
                                    onCitySelect={handleCitySelect}
                                    currentSelectedCity={selections[cop.id]?.city}
                                />
                                {selections[cop.id] && (
                                    <VehicleSelection
                                        cop={cop.id}
                                        distance={selections[cop.id].city.distance}
                                        onVehicleSelect={handleVehicleSelect}
                                        selectedVehicle={selections[cop.id]?.vehicle}
                                        vehicles={vehicles}
                                    />
                                )}
                            </Paper>
                        </Grid>
                    ))}
                    <Button onClick={determineResult} disabled={isBtnDisabled()}>Simulate</Button>
                </Grid>
                {result && (
                    <Modal open={true} onClose={() => { setResult(null); setSelections({}) }}>
                        <Box sx={{ ...modalStyle }}>
                            <Typography variant="h6" component="h2">
                                Result
                            </Typography>
                            <Typography>{result}</Typography>
                            <Button onClick={() => { setResult(null); setSelections({}) }}>Close</Button>
                        </Box>
                    </Modal>
                )}
            </Container>
        </ThemeProvider>
    );
};

const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default App;
