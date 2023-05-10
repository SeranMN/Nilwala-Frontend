import React, { useState, useRef } from 'react'
import { useEffect } from "react";
import { useField } from 'formik';
import Stack from '@mui/material/Stack';

const UploadPhoto = ({ name, avatar }) => {
    const [field, meta, helpers] = useField(name);
    const { setValue, setError } = helpers
    const { value } = field
    const [photoPath, setPhotoPath] = useState(null)
    const inputFileRef = useRef(null);

    const handleClear = () => {
        setPhotoPath(null)
    }

    useEffect(() => {
        setPhotoPath(avatar)
    }, [])

    const showFileDialog = () => {
        inputFileRef.current && inputFileRef.current.click();

    }

    const handleChange = (e) => {
        setValue(e.target.files[0])
        setPhotoPath(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <div>
            <Stack direction="row" spacing={3} alignItems='center' >
                <input
                    style={{ display: 'none' }}
                    id="uploadControlId"
                    ref={inputFileRef}
                    type="file"
                    onChange={handleChange}
                />

                <img style={{
                    maxWidth: '50%',
                    objectFit: 'cover'
                }}
                    src={photoPath ? photoPath : 'https://img.icons8.com/dotty/80/000000/add-image.png'} onClick={showFileDialog} />


                <p style={{ color: 'red', textDecoration: 'underline' }} onClick={handleClear}>clear</p>
            </Stack>
        </div>
    )
}

export default UploadPhoto