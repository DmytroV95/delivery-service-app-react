import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertWindow({isDeleted, openAlert, handleClose, handleConfirmDelete}) {
    const [openResultWindow, setOpenResultWindow] = useState(false);
    const successMessage = "The cargo has been successfully deleted";
    const errorMessage = "Error deleting cargo";
    const confirmationMessage = "Are you sure you want to delete this cargo?"

    useEffect(() => {
        if (isDeleted) {
            const timer = setTimeout(() => {
                setOpenResultWindow(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isDeleted]);

    const handleConfirm = () => {
        handleConfirmDelete();
        handleClose();
        setOpenResultWindow(true);
        if (isDeleted) {
            setTimeout(() => {
                setOpenResultWindow(false);
            }, 3000);
        }
    };

    const handleCloseErrorWindow = () => {
        setOpenResultWindow(false);
    }

    return (
        <>
            <Dialog
                open={openAlert}
                onClose={handleClose}
                aria-labelledby="confirm-dialog-title"
                aria-describedby="confirm-dialog-description"
                sx={{
                    "& .MuiDialogTitle-root": {
                        backgroundColor: "#1E90FF",
                        color: "white",
                    },
                    "& .MuiDialogContent-root": {
                        maxHeight: 40,
                    },
                }}
            >
                <DialogTitle id="confirm-dialog-title"
                             sx={{textAlign: 'center', padding: 1}}>Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description" sx={{paddingTop: 2}}>
                        {confirmationMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>


            <Dialog
                open={openResultWindow}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialogTitle-root": {
                        backgroundColor: isDeleted ? "#228B22" : "#DC143C",
                        color: "white",
                    },
                    "& .MuiDialogContent-root": {
                        maxHeight: 40,

                    },
                }}
            >
                <DialogTitle id="alert-dialog-title" sx={{textAlign: 'center', padding: 1}}>
                    {isDeleted ? "Success!" : "Error!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{paddingTop: 2}}>
                        {isDeleted ? successMessage : errorMessage}
                    </DialogContentText>
                </DialogContent>
                {!isDeleted && (
                    <DialogActions sx={{justifyContent: 'center'}}>
                        <Button onClick={handleCloseErrorWindow}>OK</Button>
                    </DialogActions>
                )}
            </Dialog>
        </>
    );
}
