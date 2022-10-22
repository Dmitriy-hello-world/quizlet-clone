import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useSnackbar } from 'notistack';
import styles from './styles.scss'

export default function UploadImage(props) {
    const { onChange, name, error } = props
    const [ file, setFile ] = useState();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (error?.length) enqueueSnackbar(error, { variant: 'error' })
    }, [ error ])

    const handleChange = (event) => {
        setFile(event.target.files[0])
        onChange(event)
    }

    return (
        <IconButton color="primary" size="large" component="label">
            <input onChange={handleChange} name={name || "image"} hidden accept="image/*" type="file" />
            <Avatar sx={{ width: 50, height: 50 }}>
                {file ? <img className={styles.image} src={URL.createObjectURL(file)}/> : <AddPhotoAlternateIcon sx={{ fontSize: 30 }}/>}
            </Avatar>
        </IconButton>
    )
}