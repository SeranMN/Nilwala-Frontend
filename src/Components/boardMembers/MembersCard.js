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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import PropTypes from 'prop-types';
import ImageIcon from '@mui/icons-material/Image';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
import UploadPhoto from './MemberPhotoUpload';
// import UploadPhoto from '../eventScheduling/UploadPhoto';
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


const MembersCard = ({ member, setToggle, toggle }) => {

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]
    // const today = new Date()

    const handleClose1 = (member, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen1(false);
    };

    const handleClick = () => {
        setOpen1(true);
    };

    const handleClose2 = (member, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
    };

    const handleClick2 = () => {
        setOpen2(true);
    };

    useEffect(() => {
        console.log("member", member)
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>

            <Button onClick={handleClickOpen} sx={{ backgroundColor: "#4caf50", boxShadow: 'none' }} autoFocus variant='contained' startIcon={<EditIcon />}>
                Edit 
            </Button>

            <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose1} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={handleClose1} severity="success" sx={{ width: '100%' }}>
                    Member Details has been sucessfully edited
                </Alert>
            </Snackbar>
            <Snackbar open={open2} autoHideDuration={5000} onClose={handleClose2} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={handleClose2} severity="success" sx={{ width: '100%' }}>
                    The Member has been Removed
                </Alert>
            </Snackbar>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {member.boardMemberName}
                </BootstrapDialogTitle>
                <Formik
                    initialValues={{
                        boardMemberName: member.boardMemberName,
                        designation: member.designation,
                        year: member.year,
                        photo: null,
                        description: member.description ? member.description : ''
                    }}
                    validationSchema={Yup.object({
                        boardMemberName: Yup.string()
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
                        console.log('values', values.boardMemberName)

                        let formData = new FormData();
                        if (values.photo) {
                            formData.append('file', values.photo)
                            formData.append('fileName', values.photo && values.photo.name)
                        }
                        formData.append('boardMemberName', values.boardMemberName)
                        formData.append('designation', values.designation)
                        formData.append('year', values.year)
                        formData.append('description', values.description)

                        axios.put(`http://localhost:5000/boardMembers/update/${member._id}`, formData).then((res) => {
                            handleClick()
                            setToggle(!toggle)
                            handleClose()
                        }).catch((err) => {
                            console.log(err, "errr")
                        })

                    }}
                >
                    {props => (
                        <Form>
                            <DialogContent style={{ minwidth: '430px', maxWidth: '470px' }} dividers>
                                <Stack direction="row" spacing={8} alignItems='center'>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Board Member Name* :</FormLabel>
                                    <TextField name='boardMemberName' onChange={props.handleChange} value={props.values.boardMemberName} style={{ width: 258 }} id="outlined-basic" size="small" label="Board Member Name*" variant="outlined" />
                                </Stack>
                                <ErrorMessage name="boardMemberName">
                                    {msg => <div style={{ color: 'red' }} className="film-details-input-validation">{msg}</div>}
                                </ErrorMessage>
                                <Stack direction="row" spacing={7} alignItems='center' mt={4}>
                                    <FormLabel sx={{ color: "black", minWidth: '105px' }}>Upload Photo* :</FormLabel>
                                    <UploadPhoto name="photo" avatar={member.avatar} />

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
                                                `Cancel`
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

export default MembersCard