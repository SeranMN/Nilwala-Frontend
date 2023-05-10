import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import PropTypes from 'prop-types';
import ImageIcon from '@mui/icons-material/Image';
import UploadPhoto from './UploadPhoto';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const EventCard = ({ event, toggle, setToggle }) => {

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]
    const today = new Date()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose1 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const handleClick = () => {
        setOpen1(true);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
    };

    const handleClick2 = () => {
        setOpen2(true);
    };


    const formatTime = (time) => {
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    return (
        <>
            <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose1} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                    The Event has been sucessfully edited
                </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={5000} onClose={handleClose2} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                    The Event has been Cancelled
                </Alert>
            </Snackbar>
            <Card sx={{ maxWidth: 360, mt: 4 }}>
                <CardHeader
                    sx={{ textAlign: 'left' }}
                    action={
                        <Chip label={event.eventStatus} sx={{ bgcolor: '#bdbdbd' }} />
                    }
                    title={event.eventName}
                    subheader={(new Date(event.date).getMonth() + 1) + '/' + (new Date(event.date).getDate()) + '/' + (new Date(event.date).getFullYear())
                        + ' ' + formatTime(new Date(event.time))}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={event.avatar ? event.avatar : 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg'}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {event.description}
                    </Typography>
                </CardContent>
                <div style={{ margin: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleClickOpen} sx={{ backgroundColor: "#4caf50", boxShadow: 'none' }} autoFocus variant='contained' startIcon={<EditIcon />}>
                            Edit
                        </Button>
                    </div>
                </div>
            </Card>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {event.eventName}
                </BootstrapDialogTitle>
                <Formik
                    initialValues={{
                        eventName: event.eventName,
                        eventStatus: event.eventStatus,
                        date: event.date,
                        time: event.time,
                        photo: null,
                        description: event.description ? event.description : ''
                    }}
                    validationSchema={Yup.object({
                        eventName: Yup.string()
                            .required('Required'),
                        date: Yup.date().typeError('Invalid date').required("Required").min(today, "Invalid date"),
                        time: Yup.mixed()
                            .required('Required'),
                        photo: Yup.mixed()
                            .nullable()
                            .test(
                                "FILE_FORMAT",
                                "invalid format",
                                (value) => {
                                    if (!value) {
                                        return true
                                    }
                                    return value && SUPPORTED_FORMATS.includes(value?.type)
                                }
                            ),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('values', values)
                        console.log('event', event)

                        console.log('values.date', values.date)
                        // console.log('values.photo', values.photo)
                        let formData = new FormData();
                        if (values.photo) {
                            formData.append('file', values.photo)
                            formData.append('fileName', values.photo && values.photo.name)
                        }
                        formData.append('eventName', values.eventName)
                        formData.append('eventStatus', values.eventStatus)
                        formData.append('date', values.date.$d ? values.date.$d : values.date)
                        formData.append('time', values.time.$d ? values.time.$d : values.time)
                        if(values.date.$y){
                            formData.append('month', values.date.$M +1)
                            formData.append('year', values.date.$y)
                        }
                        formData.append('description', values.description)

                        if(values.eventStatus == "Cancel") {
                            const data = {
                                'eventName': values.eventName,
                                'date': values.date.$d ? values.date.$d : values.date,
                                'time': values.time.$d ? values.time.$d : values.time,
                                'description': values.description
                            }
                            axios.post("http://localhost:5000/eventScheduling/cancelledEvents", data).then((res) => {
                                console.log('res', res.data)
                            }).catch((err) => {
                                console.log(err, "errr")
                            })

                            axios.delete(`http://localhost:5000/eventScheduling/delete/${event._id}`).then((res) => {
                                setToggle(!toggle)
                                handleClick2()
                                setOpen(false);
                            }).catch((err) => {
                                console.log(err, "errr")
                            })
                        }
                        else{
                        axios.put(`http://localhost:5000/eventScheduling/update/${event._id}`, formData).then((res) => {
                            setToggle(!toggle)
                            handleClick()
                            setOpen(false);
                        }).catch((err) => {
                            console.log(err, "errr")
                        })
                    }
                    }}
                >
                    {props => (
                        <Form>
                            <DialogContent style={{ minwidth: '430px', maxWidth: '470px' }} dividers>
                                <Stack direction="row" spacing={8} alignItems='center'>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Event Name* :</FormLabel>
                                    <TextField name='eventName' onChange={props.handleChange} value={props.values.eventName} style={{ width: 258 }} id="outlined-basic" size="small" label="Event Name*" variant="outlined" />
                                </Stack>
                                <ErrorMessage name="eventName">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Event Name* :</FormLabel>
                                    <Select
                                        name='eventStatus'
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        style={{ width: 258 }}
                                        onChange={props.handleChange}
                                        value={props.values.eventStatus}
                                    >
                                        <MenuItem value={"Pending"}>Pending</MenuItem>
                                        <MenuItem value={"Publish"}>Publish</MenuItem>
                                        <MenuItem value={"Cancel"}>Cancel</MenuItem>
                                    </Select>
                                </Stack>
                                <ErrorMessage name="eventName">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Date* :</FormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            inputFormat="MM/DD/YYYY"
                                            value={props.values.date}
                                            onChange={value => props.setFieldValue("date", value)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                <ErrorMessage name="date">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Time* :</FormLabel>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <TimePicker
                                            value={props.values.time}
                                            onChange={value => props.setFieldValue("time", value)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Stack>
                                <ErrorMessage name="time">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={7} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Upload Photo* :</FormLabel>
                                    <UploadPhoto name="photo" avatar={event.avatar} />

                                    {/* <input id="file" name="file" type="file" onChange={(e) => props.setFieldValue("photo", e.currentTarget.files[0])} /> */}
                                </Stack>
                                <ErrorMessage name="photo">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Description :</FormLabel>
                                    <TextareaAutosize
                                        aria-label="minimum height"
                                        name='description'
                                        onChange={props.handleChange}
                                        value={props.values.description}
                                        minRows={3}
                                        placeholder="Description"
                                        style={{ width: 258, paddingLeft: 8 }}
                                    />
                                </Stack>
                                <ErrorMessage name="description">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                            </DialogContent>
                            <div style={{ margin: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button autoFocus onClick={handleClose} variant='contained' color="error">
                                        Close
                                    </Button>
                                    {props.dirty &&
                                        <Button onClick={props.submitForm} variant='contained' >
                                            {props.values.eventStatus == "Cancel" ?
                                                `Cancel the Event`
                                                :
                                                `Save`
                                            }
                                            
                                        </Button>
                                    }
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </BootstrapDialog>
        </>

    )
}

export default EventCard