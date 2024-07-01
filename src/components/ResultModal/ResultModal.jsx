import React from 'react';
import { Box, Typography, Button, Modal } from '@mui/material';
import './ResultModal.css';

const ResultModal = ({ result, onClose }) => {
    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={{ ...modalStyle }}>
                <Typography variant="h6" component="h2">
                    Result
                </Typography>
                <Typography>{result}</Typography>
                <Button onClick={onClose}>Close</Button>
            </Box>
        </Modal>
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

export default ResultModal;
