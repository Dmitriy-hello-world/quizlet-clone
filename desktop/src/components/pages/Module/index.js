import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { useGetModuleQuery } from "../../../services/modules"
import { Stack, TextField, IconButton, Typography } from "@mui/material";
import { useCreateWordMutation, useDeleteWordMutation, useGetWordsQuery, useUpdateWordMutation } from "../../../services/words";
import { useCreateImageMutation } from "../../../services/images";
import { WORD_UPDATE_TABS } from "../../../constants";
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import WordsList from "../../shared/WordsList";
import Modal from '../../shared/Modal'
import Popover from '@mui/material/Popover';
import StyleIcon from '@mui/icons-material/Style';
import { useNavigate } from 'react-router-dom';
import styles from './styles.scss';


export default function Module() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: module } = useGetModuleQuery(id);
    const [ createWord ] = useCreateWordMutation();
    const [ updateWord ] = useUpdateWordMutation();
    const [ deleteWord ] = useDeleteWordMutation();
    const [ createImage ] = useCreateImageMutation();
    const [ formData, setFormData ] = useState({});
    const [ anchorEl, setAnchoreEl ] = useState();
    const [ translateValue, setTranslateValue ] = useState(null);
    const [ reshreshKey, setRefresh ] = useState(new Date());
    const [ open, setOpen ] = useState(false);
    const [ injectFields, setInjectFields ] = useState({});
    const [ tabs, setTabs ] = useState({
        Update: WORD_UPDATE_TABS
    })

    const definitionRef = useRef();

    const handleKeydown = (event) => {
        switch(event.key) {
            case 'Enter': {
                handleSend()
                break;
            }
            default: {
                break;
            }
        }
    }

    useEffect(() => {
        window.electron.on('translated', (_, result) => setTranslateValue(result))

        return () => window.electron.removeListener('translated', (_, result) => setTranslateValue(result));
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        const timeout = setTimeout(() => {
            if (formData?.term?.length) {
                setTranslateValue(null);
                window.electron.send('translate', formData?.term);
            }
        }, 500)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
            return clearTimeout(timeout)
        }
    }, [ formData ])

    const { data: words, isLoading, isError, refetch } = useGetWordsQuery({ moduleId: id })

    const handleOnChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleShowPopover = () => setAnchoreEl(definitionRef.current)

    const handleSend = async () => {
        if (formData?.image) {
            const form = new FormData();
            form.append("file", formData?.image);
            const { url } = await createImage(form).unwrap()
            await createWord({ moduleId: id, ...formData, imageUrl: url });
            setFormData(prev => Object.fromEntries(Object.entries(prev).map(([key]) => [key, ''])))
            refetch()
        } else {
            await createWord({ moduleId: id, ...formData });
            setFormData(prev => Object.fromEntries(Object.entries(prev).map(([key]) => [key, ''])))
            refetch()
        }
    }

    const handleUpdate = async ({id, ...rest}) => {
        setInjectFields({ id })
        setTabs(prev => ({
            ...prev,
            Update: WORD_UPDATE_TABS.map(field => ({
                ...field,
                ...(rest?.[field?.name] ? { value: rest[field?.name] } : {})
            }))
        }))
        setRefresh(new Date())
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

    const handlePopoverClick = (event) => {
        event.stopPropagation()
        setFormData(prev => ({
            ...prev,
            definition: translateValue
        }))
        setAnchoreEl(null)
    }

    return (
        <>
            <IconButton color="primary" onClick={handleStartCardsGame} size="large" className={styles.startButton}>
                <StyleIcon fontSize="large" />
            </IconButton>
            <Modal key={reshreshKey} isOpen={open} hideTabs injectFields={injectFields} onSend={onSend} onClose={() => setOpen(false)} tabs={tabs} defaultTab='Update' />
            <Stack direction="row" className={styles.Stack} justifyContent="center" alignItems="center" spacing={1}>
                <IconButton sx={{}} color="primary" component="label">
                    <input onChange={(event) => setFormData((prev) => ({
                        ...prev,
                        [event.target.name]: event.target.files[0],
                    }))} hidden name="image" accept="image/*" type="file" />
                    <AddPhotoAlternateIcon sx={{ fontSize: 45 }} />
                </IconButton>
                <TextField id="standard-basic" fullWidth label="Key" name="term" value={formData.term || ''} variant="standard" onChange={handleOnChange}/>
                <TextField id="standard-basic" ref={definitionRef} fullWidth label="Value" name="definition" value={formData.definition || ''} variant="standard"
                onClick={handleShowPopover}
                onChange={handleOnChange}/>
                <Popover
                    id={id}
                    open={!!(anchorEl && translateValue)}
                    anchorEl={anchorEl}
                    onClose={() => setAnchoreEl(null)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                >
                    <Typography id='translated-value' onClick={handlePopoverClick} sx={{ p: 2, cursor: 'pointer' }}>{translateValue}</Typography>
                </Popover>
                <IconButton mt={10} color="primary" size="large" onClick={handleSend}><AddBoxIcon sx={{ fontSize: 45 }} /></IconButton>
            </Stack>
            <Stack justifyContent="center" alignItems="center">
                <WordsList handleUpdate={handleUpdate} handleDelete={handleDelete} words={words?.list}/>
            </Stack>
        </>
    )
}