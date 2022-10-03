import React, { useState } from 'react'; 
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';

export default function Menu(props) {
    const { value, handleChange } = props;

    return (
        <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} value={value} onChange={handleChange}>
            <BottomNavigationAction label="Modules" value="modules" icon={<FolderIcon />} />
        </BottomNavigation>
    )
}