import * as React from 'react';
import {Box, Fab} from "@mui/material";
import Modal from '@mui/material/Modal';
import UrlShortener from "../UrlShortener";
import AddIcon from "@mui/icons-material/Add";

interface AddUrlModalProps {
    onUrlCreated?: () => void;
}

export default function AddUrlModal({ onUrlCreated }: AddUrlModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleUrlCreated = () => {
        if (onUrlCreated) {
            onUrlCreated();
        }
    };

    return (
        <div>
            <Fab
                onClick={handleOpen}
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                }}
                color="primary"
                aria-label="add"
            >
                <AddIcon/>
            </Fab>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '10px'
                }}>
                    <UrlShortener onUrlCreated={handleUrlCreated}/>
                </Box>
            </Modal>
        </div>
    );
}
