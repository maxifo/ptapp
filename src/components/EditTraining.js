import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function EditTraining(props) {

    const [training, setTraining] = useState({ date: '', duration: '', activity: '' })
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setTraining({
            date: props.params.data.date,
            duration: props.params.data.duration,
            activity: props.params.data.activity,
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        props.updateTraining(props.params.value, training);
        handleClose();
    }

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit
        </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit customer</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        name="date"
                        value={training.date}
                        onChange={inputChanged}
                        label="Date"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        label="Duration"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        label="Activity"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
            </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
            </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default EditTraining;