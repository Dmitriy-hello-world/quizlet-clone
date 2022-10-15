import React, { useState } from 'react'; 
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import { useNavigate } from 'react-router-dom';

export default function Menu(props) {
    const { value } = props;
    const navigate = useNavigate()

    const handleChange = (_, value) => {
        navigate(value)
    }

    return (
        <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1111 }} value={value} onChange={handleChange}>
            <BottomNavigationAction label="Modules" value="/modules" icon={<FolderIcon />} />
        </BottomNavigation>
    )
}