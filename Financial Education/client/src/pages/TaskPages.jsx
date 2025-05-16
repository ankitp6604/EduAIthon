import React, { useState, useEffect } from 'react';
import Center from '../animated-components/Center';
import { CircularProgress, IconButton, Tooltip } from "@mui/material";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Api from "../api";
import AddTaskModal from '../components/AddTaskModal';
import { toast } from 'react-toastify';
import Checkbox from '@mui/material/Checkbox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const TaskPages = () => {
    const [user, setUser] = useState();
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user')));
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)
    const [change, setChange] = useState(false)
    const [pending, setPending] = useState()
    const [completed, setCompleted] = useState()

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        setLoading(true)
        const fetchUser = async () => {
            await Api.getUser({ email: userInfo.email })
                .then((res) => {
                    console.log('User:', res.data);
                    localStorage.setItem('level', res.data.user.gaming.level)
                    const pen = res.data.user.tasks.filter((task) => (!task.isCompleted))
                    const comp = res.data.user.tasks.filter((task) => (task.isCompleted))
                    console.log(pen)
                    console.log(comp)
                    setPending(pen)
                    setCompleted(comp)
                    setUser(res.data.user);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching user:', error);
                });
        };
        fetchUser();
    }, [change]);

    const updateTask = async (task) => {
        await Api.setTaskStatus({
            email: user.email,
            id: task._id
        })
            .then((res) => {
                console.log('User:', res.data);
                setChange(!change)
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }

    const formatDate = (dt) => {
        const date = new Date(dt)
        return date.toLocaleDateString()
    }

    const handleDelete = async (task) => {
        // console.log(task)

        await Api.deleteTask({
            email: user.email,
            id: task._id
        })
            .then((res) => {
                console.log('User:', res.data);
                setChange(!change)
            })
            .catch((error) => {
                console.error('Error fetching user:', error);
            });
    }

    return (
        <Center>
            {loading ? (
                <div className='w-full h-screen flex items-center justify-center'>
                    <CircularProgress />
                </div>
            ) : (
                <div className={`w-full ${completed.length > 0 ? "h-full" : "h-screen"} flex flex-col gap-6 p-4 md:p-6`}>
                    {/* Pending Tasks Section */}
                    <div className='w-full'>
                        <div className='w-full p-2 text-xl md:text-2xl font-bold tracking-wide flex items-center justify-between'>
                            <span>Pending Financial Habits</span>
                            <IconButton onClick={handleClickOpen} className="hover:scale-110 transition-transform">
                                <AddCircleRoundedIcon className='text-2xl md:text-3xl' />
                            </IconButton>
                        </div>
                        
                        {pending.length > 0 ? (
                            <div className='mt-4 p-2 w-full overscroll-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                                {pending.map((task) => (
                                    <div
                                        key={task._id}
                                        className='relative min-h-[180px] bg-white rounded-xl p-4 md:p-6 flex flex-col gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300'
                                    >
                                        <div className='w-full flex-1'>
                                            <h3 className="text-lg md:text-xl font-semibold text-[#33006F] mb-2">
                                                {task.title}
                                            </h3>
                                            <p className='text-sm md:text-base font-medium text-gray-600'>
                                                {task.desc}
                                            </p>
                                        </div>
                                        
                                        <div className='flex items-center justify-between mt-4'>
                                            {task.isAdminGenerated ? (
                                                <Tooltip arrow title="These are admin generated tasks. Failing to do these tasks will lead to decrease in your avatars health!">
                                                    <IconButton className="text-[#33006F]">
                                                        <InfoOutlinedIcon className='text-xl md:text-2xl' />
                                                    </IconButton>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip arrow title="Delete this task">
                                                    <IconButton onClick={() => handleDelete(task)} className="text-red-500">
                                                        <DeleteIcon className='text-xl md:text-2xl' />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            
                                            <div className='flex items-center gap-2 text-sm text-gray-500'>
                                                <CalendarMonthIcon className='text-lg md:text-xl' />
                                                <span>{formatDate(task.date)}</span>
                                            </div>
                                        </div>
                                        
                                        <div className='absolute top-2 right-2'>
                                            <Checkbox
                                                onClick={() => updateTask(task)}
                                                sx={{ 
                                                    '& .MuiSvgIcon-root': { 
                                                        fontSize: { xs: 32, md: 40 } 
                                                    } 
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='w-full text-center mt-8 font-semibold text-lg md:text-xl text-gray-600'>
                                No Pending Financial Habits Yet :)
                            </div>
                        )}
                    </div>

                    {/* Add Task Modal */}
                    {open && (
                        <AddTaskModal 
                            open={open} 
                            handleClose={handleClose} 
                            user={user} 
                            setChange={setChange} 
                            change={change} 
                        />
                    )}

                    {/* Completed Tasks Section */}
                    <div className='w-full'>
                        <div className='w-full p-2 text-xl md:text-2xl font-bold tracking-wide'>
                            Completed Financial Habits
                        </div>
                        
                        {completed.length > 0 ? (
                            <div className='mt-4 p-2 w-full overscroll-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                                {completed.map((task) => (
                                    <div
                                        key={task._id}
                                        className='relative min-h-[180px] bg-white rounded-xl p-4 md:p-6 flex flex-col gap-2 shadow-lg'
                                    >
                                        <div className='w-full flex-1'>
                                            <h3 className="text-lg md:text-xl font-semibold text-[#33006F] mb-2">
                                                {task.title}
                                            </h3>
                                            <p className='text-sm md:text-base font-medium text-gray-600'>
                                                {task.desc}
                                            </p>
                                        </div>
                                        
                                        <div className='flex items-center justify-between mt-4'>
                                            {task.isAdminGenerated ? (
                                                <Tooltip arrow title="These are admin generated tasks. Failing to do these tasks will lead to decrease in your avatars health!">
                                                    <IconButton className="text-[#33006F]">
                                                        <InfoOutlinedIcon className='text-xl md:text-2xl' />
                                                    </IconButton>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip arrow title="Delete this task">
                                                    <IconButton onClick={() => handleDelete(task)} className="text-red-500">
                                                        <DeleteIcon className='text-xl md:text-2xl' />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            
                                            <div className='flex items-center gap-2 text-sm text-gray-500'>
                                                <CalendarMonthIcon className='text-lg md:text-xl' />
                                                <span>{formatDate(task.date)}</span>
                                            </div>
                                        </div>
                                        
                                        <div className='absolute top-2 right-2'>
                                            <Checkbox
                                                onClick={() => updateTask(task)}
                                                checked
                                                sx={{ 
                                                    '& .MuiSvgIcon-root': { 
                                                        fontSize: { xs: 32, md: 40 } 
                                                    } 
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='w-full text-center mt-8 font-semibold text-lg md:text-xl text-gray-600'>
                                No Completed Financial Habits Yet :(
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Center>
    );
};

export default TaskPages;