import React, { useState, useEffect } from 'react'; 
import Menu from '../../shared/Menu';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout(props) {
    const location = useLocation()

    return (
        <>
            <Menu value={location.pathname} />
            <Outlet/>
        </>
    )
}