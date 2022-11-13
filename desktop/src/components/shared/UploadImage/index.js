import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { HOST } from '../../../constants';
import { stringToColor } from '../../../utils/utils';
import Tooltip from '@mui/material/Tooltip';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useSnackbar } from 'notistack';

export default function UploadImage(props) {
    const { onChange, name, disabled, value, error } = props
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
        <Tooltip title="Upload image">
             <IconButton disabled={disabled} color="primary" size="large" component="label">
                <input disabled={disabled} onChange={handleChange} name={name || "image"} hidden accept="image/*" type="file" />
                <Avatar 
                    sx={{ width: 50, height: 50, ...(value ? { bgcolor: stringToColor(value) } : {}) }}
                    src={file ? URL?.createObjectURL(file) : `${HOST}${value}` || null}
                    children = {file ? null : value?.split(' ').map(word => word[0].toUpperCase()).join('') || <AddPhotoAlternateIcon sx={{ fontSize: 30 }}/>}
                />
            </IconButton>
        </Tooltip>
    )
}