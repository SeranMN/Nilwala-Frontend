import React from 'react'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import DatePicker from "react-datepicker"
import axios from 'axios'
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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


const AddBoardMembers = ({toggle, setToggle}) => {

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [value, setValue] = React.useState(dayjs('2022-09-09T21:11:54'));
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]
    const today = new Date()

    const handleChange = (newValue) => {
        setValue(newValue);
    };

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

    return (
        <>
             <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose1} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                    The Board Members has been sucessfully added
                </Alert>
            </Snackbar>

            <Button variant="contained" onClick={handleClickOpen} size="medium" startIcon={<AddIcon />}>
                Add Board Members
            </Button>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Board Members
                </BootstrapDialogTitle>
                <Formik
                    initialValues={{
                        boardMemberName: '',
                        designation: '',
                        year:'',
                        photo: null,
                        description: ''
                    }}
                    validationSchema={Yup.object({
                        boardMemberName: Yup.string()
                            .required('Required'),
                        designation: Yup.string()
                            .required('Required'),
                        year: Yup.string()
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
                        console.log(values)
                        let formData = new FormData();
                        formData.append('file', values.photo)
                        formData.append('boardMemberName', values.boardMemberName)
                        formData.append('designation', values.designation)
                        formData.append('year', values.year)
                        formData.append('fileName', values.photo && values.photo.name)
                        formData.append('description', values.description)

                        axios.post("http://localhost:5000/boardMembers/create", formData).then((res) => {
                            setToggle(!toggle)
                            handleClick()
                            setOpen(false)
                        }).catch((err) => {
                            console.log(err)
                        })
                    }}
                >
                    {props => (
                        <Form>
                            <DialogContent dividers>
                                <Stack direction="row" spacing={8} alignItems='center'>
                                    <FormLabel sx={{ color: "black" }}>Board Member Name* :</FormLabel>
                                    <TextField name='boardMemberName' onChange={props.handleChange} value={props.values.boardMemberName} style={{ width: 258 }} id="outlined-basic" size="small" label="Board Member Name*" variant="outlined" />
                                </Stack>
                                <ErrorMessage name="boardMemberName">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={7} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Upload Photo* :</FormLabel>
                                    <input id="file" name="file" type="file" onChange={(e) => props.setFieldValue("photo", e.currentTarget.files[0])} />
                                </Stack>
                                <ErrorMessage name="photo">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Designation :</FormLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='designation'
                                        label="Designation"
                                        defaultValue=''
                                        value={props.values.designation}
                                        onChange={props.handleChange}
                                        style={{ width: 258 }}
                                    >
                                        <MenuItem value={"President"}>President</MenuItem>
                                        <MenuItem value={"Vice President"}>Vice President</MenuItem>
                                        <MenuItem value={"Secretary"}>Secretary</MenuItem>
                                        <MenuItem value={"Treasurer"}>Treasurer</MenuItem>
                                        <MenuItem value={"Member"}>Member</MenuItem>
                                    </Select>
                                </Stack>
                                <ErrorMessage name="designation">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={8} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Year :</FormLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name='year'
                                        label="Year"
                                        defaultValue=''
                                        value={props.values.year}
                                        onChange={props.handleChange}
                                        style={{ width: 258 }}
                                    >
                                        <MenuItem value={"2024"}>2024</MenuItem>
                                        <MenuItem value={"2023"}>2023</MenuItem>
                                        <MenuItem value={"2022"}>2022</MenuItem>
                                        <MenuItem value={"2021"}>2021</MenuItem>
                                        <MenuItem value={"2020"}>2020</MenuItem>
                                    </Select>
                                </Stack>
                                <ErrorMessage name="designation">
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
                                    <Button type='submit' autoFocus variant='contained'>
                                        Add Board Member
                                    </Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </BootstrapDialog>
        </>
    )
}

export default AddBoardMembers