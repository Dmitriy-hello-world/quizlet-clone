import React, { useState, useEffect } from 'react'; 
import Menu from '../../shared/Menu';
import { Outlet } from 'react-router-dom';

export default function Layout(props) {
    const [ value, setValue ] = useState('modules');

    const handleChange = (_, newValue) => {
        setValue(newValue)
    }

    return (
        <>
            <Menu handleChange={handleChange} value={value} />
            <Outlet/>
        </>
    )
}