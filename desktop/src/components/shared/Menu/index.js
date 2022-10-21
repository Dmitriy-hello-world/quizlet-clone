import React, { useState } from 'react'; 
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from 'prop-types'
import { TOKEN } from '../../../constants';
import { logout } from '../../../features/sessions/sessionSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export default function Menu(props) {
    const { value } = props;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (_, value) => {
        if (value === 'logout') {
            localStorage.removeItem(TOKEN)
            dispatch(logout())
            return navigate('/')
        }

        navigate(value)
    }

    return (
        <BottomNavigation sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1111 }} value={value} onChange={handleChange}>
            <BottomNavigationAction label="Modules" value="/modules" icon={<FolderIcon />} />
            <BottomNavigationAction label="Logout" value="logout" icon={<LogoutIcon/>}/>
        </BottomNavigation>
    )
}

Menu.propTypes = {
    value: PropTypes.string.isRequired
}