import React, { useState, useEffect } from 'react'; 
import { useGetProfileQuery } from '../../../services/users';
import ModuleCard from '../../shared/Card';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import Modal from '../../shared/Modal';
import { useCreateModuleMutation, useDeleteModuleMutation, useUpdateModuleMutation } from '../../../services/modules';
import { CREATE_MODULE_TABS } from '../../../constants';
import styles from './styles.scss'


export default function Modules(props) {
    const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();
    const [ deleteModule ] = useDeleteModuleMutation();
    const [ createModule ] = useCreateModuleMutation();
    const [ updateModule ] = useUpdateModuleMutation();
    const [ tab, setTab ] = useState('Create')
    const [ injectFields, setInjectFields ] = useState({});
    const [ open, setOpen ] = useState(false);
    
    const [ tabs, setTabs ] = useState({
        Create: CREATE_MODULE_TABS,
        Update: CREATE_MODULE_TABS
    })

    const actions = {
        Create: async (payload) => {
            const { status } = await createModule(payload).unwrap();

            if (!status) return
            
            refetch()
            return setOpen(false)
        },
        Update: async (payload) => {
            const { status } = await updateModule(payload).unwrap();

            if (!status) return
            
            refetch()
            return setOpen(false)
        }
    }

    const handleAddModule = () => {
        setTab('Create')
        setOpen(true)
    }

    const onSend = async (payload, action) => {
        return await actions[action](payload)
    }

    const onDelete = async (id) => {
        const { status } = await deleteModule(id).unwrap()
        
        if (!status) return
        return refetch()
    }

    const onEdit = (id) => {
        setInjectFields({ id })
        setTab('Update')
        setOpen(true)
    }

    return (
        <>
        <div className={styles.buttonsBlock}>
            <Modal key={tab} isOpen={open} hideTabs injectFields={injectFields} onSend={onSend} onClose={() => setOpen(false)} tabs={tabs} defaultTab={tab} />
            <IconButton onClick={handleAddModule} color="primary" size="large"><AddCircleIcon fontSize="inherit"/></IconButton>
        </div>
        <div className={styles.cardsContainer}>
            {profile?.data?.modules?.map(module => <ModuleCard onDelete={onDelete} onEdit={onEdit} key={module?.id} {...module} />)}
        </div>
        </>
    )
}