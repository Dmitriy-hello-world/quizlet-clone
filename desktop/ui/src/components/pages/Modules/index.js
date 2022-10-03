import React, { useState, useEffect } from 'react'; 
import { useGetProfileQuery } from '../../../services/users';
import ModuleCard from '../../shared/Card';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Modal from '../../shared/Modal';
import { useCreateModuleMutation } from '../../../services/modules';
import styles from './styles.scss'


export default function Modules(props) {
    const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();
    const [ createModule ] = useCreateModuleMutation();
    const [ open, setOpen ] = useState(false);
    const [ tabs, setTabs ] = useState({
        Create: [
            {
                label: 'Name',
                name: 'name',
            },
            {
                label: 'Description',
                name: 'description',
            },
            {
                label: 'Private',
                name: 'private',
                type: 'boolean',
                defaultChecked: true
            },
            {
                label: 'Edited by outsiders',
                name: 'editedByOutsiders',
                type: 'boolean'
            }
        ]
    })

    const handleAddModule = () => setOpen(prev => !prev)

    const onSend = async (payload) => {
        const { status } = await createModule(payload).unwrap();

        if (!status) return
        
        refetch()
        setOpen(false)
    }

    return (
        <>
        <div className={styles.buttonsBlock}>
            <Modal isOpen={open} onSend={onSend} onClose={() => setOpen(false)} tabs={tabs} defaultTab={'Create'} />
            <IconButton onClick={handleAddModule} color="primary" size="large"><AddCircleIcon fontSize="inherit"/></IconButton>
        </div>
        <div className={styles.cardsContainer}>
            {profile?.data?.modules?.map(module => <ModuleCard key={module?.id} {...module} />)}
        </div>
        </>
    )
}