import React, {useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertWindowUpdate({isUpdated, openAlert, handleClose}) {
    const successMessage = "The cargo has been successfully updated";
    const errorMessage = "Error updating cargo";

    useEffect(() => {
        if (isUpdated) {
            const timer = setTimeout(() => {
                handleClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [handleClose, isUpdated]);

    return (
            <Dialog
                open={openAlert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialogTitle-root": {
                        backgroundColor: isUpdated ? "#228B22" : "#DC143C",
                        color: "white",
                    },
                    "& .MuiDialogContent-root": {
                        maxHeight: 40,

                    },
                }}
            >
                <DialogTitle id="alert-dialog-title" sx={{textAlign: 'center', padding: 1}}>
                    {isUpdated ? "Success!" : "Error!"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{paddingTop: 2}}>
                        {isUpdated ? successMessage : errorMessage}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
    );
}
