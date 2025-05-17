import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import Api from '../api/index';
import { toast } from 'react-toastify';

const AddTaskModal = ({ open, handleClose, user, setChange, change }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')

    const addTask = async () => {
        if (!title || !desc) {
            toast.error('Please fill in all fields');
            return;
        }
        
        await Api.addTask({
            email: user.email,
            task: {
                title: title,
                desc: desc,
                isCompleted: false,
                isAdminGenerated: false
            }
        })
            .then((res) => {
                console.log(res.data)
                setTitle('')
                setDesc('')
                handleClose()
                setChange(!change)
            })
            .catch((err) => {
                console.log(err)
                toast.error('Failed to add task. Please try again.');
            })
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title" className="text-xl font-bold text-[#33006F]">
                Add New Financial Habit
            </DialogTitle>
            
            <DialogContent>
                <DialogContentText id="alert-dialog-description" className="mt-4">
                    <TextField
                        id="title"
                        label="Financial Habit Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-4"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#33006F',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#33006F',
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#33006F',
                            },
                        }}
                    />
                    
                    <TextField
                        id="description"
                        label="Financial Habit Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                    borderColor: '#33006F',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#33006F',
                                },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#33006F',
                            },
                        }}
                    />
                </DialogContentText>
            </DialogContent>
            
            <DialogActions className="p-4">
                <Button 
                    onClick={handleClose}
                    variant="outlined"
                    color="error"
                >
                    Cancel
                </Button>
                <Button 
                    onClick={addTask}
                    variant="contained"
                    sx={{ 
                        backgroundColor: '#33006F',
                        '&:hover': {
                            backgroundColor: '#662d91'
                        }
                    }}
                >
                    Add Habit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddTaskModal;