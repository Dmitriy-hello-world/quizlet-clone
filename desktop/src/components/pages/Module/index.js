import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useGetModuleQuery } from "../../../services/modules"
import { Stack, TextField, IconButton } from "@mui/material";
import { useCreateWordMutation, useDeleteWordMutation, useGetWordsQuery, useUpdateWordMutation } from "../../../services/words";
import { WORD_UPDATE_TABS } from "../../../constants";
import AddBoxIcon from '@mui/icons-material/AddBox';
import WordsList from "../../shared/WordsList";
import Modal from '../../shared/Modal'
import StyleIcon from '@mui/icons-material/Style';
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';


export default function Module(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: module } = useGetModuleQuery(id);
    const [ createWord ] = useCreateWordMutation();
    const [ updateWord ] = useUpdateWordMutation();
    const [ deleteWord ] = useDeleteWordMutation();
    const [ formData, setFormData ] = useState({});
    const [ open, setOpen ] = useState(false);
    const [ injectFields, setInjectFields ] = useState({});
    const [ tabs, setTabs ] = useState({
        Update: WORD_UPDATE_TABS
    })

    const { data: words, isLoading, isError, refetch } = useGetWordsQuery({ moduleId: id })

    const handleOnChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleSend = async () => {
        setFormData(prev => Object.fromEntries(Object.entries(prev).map(([key]) => [key, ''])))
        await createWord({ moduleId: id, ...formData });
        refetch()
    }

    const handleUpdate = async (id) => {
        setInjectFields({ id })
        setOpen(true);
    }

    const onSend = async (payload) => {
        await updateWord({ ...injectFields, ...payload});
        setOpen(false)
        refetch()
    }

    const handleDelete = async (id) => {
        await deleteWord(id);
        refetch()
    }

    const handleStartCardsGame = () => navigate(`/cards/${id}`)

    return (
        <>
        <IconButton color="primary" onClick={handleStartCardsGame} size="large" className={styles.startButton}>
            <StyleIcon fontSize="large" />
        </IconButton>
        <Modal isOpen={open} hideTabs injectFields={injectFields} onSend={onSend} onClose={() => setOpen(false)} tabs={tabs} defaultTab='Update' />
        <Stack direction="row" className={styles.Stack} justifyContent="center" alignItems="center" spacing={1}>
            <TextField id="standard-basic" fullWidth label="Key" name="term" value={formData.term || ''} variant="standard" onChange={handleOnChange}/>
            <TextField id="standard-basic" fullWidth label="Value" name="definition" value={formData.definition || ''} variant="standard" onChange={handleOnChange}/>
            <IconButton color="primary" size="large" onClick={handleSend}><AddBoxIcon sx={{ fontSize: 45 }} /></IconButton>
        </Stack>
        <Stack justifyContent="center" alignItems="center">
            <WordsList handleUpdate={handleUpdate} handleDelete={handleDelete} words={words?.list}/>
        </Stack>
        </>
    )
}