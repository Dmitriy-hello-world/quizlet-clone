import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { LANGUAGES } from '../../../constants';
import { useUpdateUserMutation, useDeleteUserMutation } from '../../../services/users';
import { useCreateImageMutation } from '../../../services/images';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import FormData from '../../base/FormData';
import { IconButton, Paper } from '@mui/material';
import { TOKEN } from '../../../constants';
import { Dialog, DialogTitle, DialogActions } from '@mui/material';
import { logout } from '../../../features/sessions/sessionSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';

export default function Account() {
    const user = useSelector(state => state?.users);
    const [ editMode, setEditMode ] = useState(false);
    const [ updateUser ] = useUpdateUserMutation();
    const [ deleteUser ] = useDeleteUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ open, setOpen ] = useState(false);
    const [ uploadImage ] = useCreateImageMutation();
    const [ formData, setFormData ] = useState({})
    const [ userState, setUserState ] = useState([
        {
            label: 'Avatar',
            name: 'avatarUrl',
            typeField: 'image',
            style: {
                textAlign: 'center'
            },
            disabled : true,
            value: user?.avatarUrl || `${user?.firstName} ${user?.secondName}`
        },
        {
            label: 'Name',
            name: 'firstName',
            variant: 'standard',
            disabled : true,
            value: user?.firstName
        },
        {
            label: 'Second Name',
            name: 'secondName',
            variant: 'standard',
            disabled : true,
            value: user?.secondName
        },
        {
            label: 'Email',
            name: 'email',
            variant: 'standard',
            disabled : true,
            value: user?.email
        },
        {
            label: 'Language',
            name: 'lang',
            typeField: 'select',
            disabled : true,
            value: user?.lang || '',
            options: Object.entries(LANGUAGES)
        }
    ])  

    const handleEditClick = async () => {
        setEditMode(prev => !prev);
        setUserState(prev => prev.map(field => ({ ...field, disabled: editMode })))
        if (editMode) {
            if (formData?.avatarUrl) {
                const url = await uploadImage(formData?.avatarUrl).unwrap();
                await updateUser({ ...formData, id: user?.id, avatar: url })
            } else {
                updateUser({ ...formData, id: user?.id })
            }   
        }
    }

    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        await deleteUser({ id: user?.id });
        localStorage.removeItem(TOKEN)
        dispatch(logout())
        return navigate('/')
    }

    return (
        <div className={styles.mainBlock}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {`Do you really want to delete your account?`}
                </DialogTitle>
                <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleDelete} autoFocus>
                    Yes
                </Button>
                </DialogActions>
            </Dialog>
            <Paper elevation={3} className={styles.userInfoBlock}>
                <IconButton className={styles.editButton} onClick={handleEditClick}>
                    {editMode ? <SaveIcon/> : <EditIcon/>}
                </IconButton>
                <FormData 
                    fields={userState} 
                    formData={formData} 
                    setFormData={setFormData}
                    fieldStyles={styles.formFields}
                />
                <Button onClick={() => setOpen(true)} variant="contained" sx={{ marginTop: 2 }} color="error">
                    Delete account
                </Button>
            </Paper>
            {/* <Paper elevation={3} className={styles.accountSettingsBlock}>
                dgfgdg
            </Paper> */}
        </div>
    )
}