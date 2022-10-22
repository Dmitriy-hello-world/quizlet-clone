import React, { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { useGetModuleQuery } from "../../../services/modules"
import { Stack, TextField, IconButton, Typography } from "@mui/material";
import { useCreateWordMutation, useDeleteWordMutation, useGetWordsQuery, useUpdateWordMutation } from "../../../services/words";
import { useCreateImageMutation } from "../../../services/images";
import { WORD_UPDATE_TABS } from "../../../constants";
import AddBoxIcon from '@mui/icons-material/AddBox';
import WordsList from "../../shared/WordsList";
import { CircularProgress } from "@mui/material";
import Modal from '../../shared/Modal'
import Popover from '@mui/material/Popover';
import StyleIcon from '@mui/icons-material/Style';
import { useNavigate } from 'react-router-dom';
import PayloadValidator from "../../../utils/PayloadValidator";
import UploadImage from "../../shared/UploadImage";
import styles from './styles.scss';


const PV = new PayloadValidator({
    term : [ 'required' ],
    definition : [ 'required' ],
    image: [ { 'image-size': 200000 } ]
})

export default function Module() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: module } = useGetModuleQuery(id);
    const [ createWord ] = useCreateWordMutation();
    const [ updateWord ] = useUpdateWordMutation();
    const [ deleteWord ] = useDeleteWordMutation();
    const [ createImage ] = useCreateImageMutation();
    const [ formData, setFormData ] = useState({});
    const [ errors, setErrors ] = useState({});
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
        setErrors({})
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    const handleShowPopover = () => setAnchoreEl(definitionRef.current)

    const handleSend = async () => {
        try {
            PV.validate(formData)
            if (formData?.image) {
                const url = await uploadImage(formData?.image)
                await createWord({ moduleId: id, ...formData, imageUrl: url });
                setFormData(prev => Object.fromEntries(Object.entries(prev).map(([key]) => [key, ''])))
                refetch()
            } else {
                await createWord({ moduleId: id, ...formData });
                setFormData(prev => Object.fromEntries(Object.entries(prev).map(([key]) => [key, ''])))
                refetch()
            }
            setRefresh(new Date())
        } catch(err) {
            setErrors(err)
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

    const uploadImage = async (image) => {
        const form = new FormData();
        form.append("file", image);

        return await createImage(form).unwrap()
    }

    const onSend = async (payload) => {
        if (payload?.image) {
            const url = await uploadImage(payload?.image)
            await updateWord({ ...injectFields, ...payload, imageUrl: url });
            setOpen(false)
            refetch()
        } else {
            await updateWord({ ...injectFields, ...payload });
            setOpen(false)
            refetch()
        }
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

    const handleSetImage = (event) => {
        setErrors({});
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.files[0],
        }))
    }

    if (isLoading) return <CircularProgress sx={{ position: 'absolute', top: '45%', left: '50%' }}/>

    return (
        <>
            <IconButton color="primary" onClick={handleStartCardsGame} size="large" className={styles.startButton}>
                <StyleIcon fontSize="large" />
            </IconButton>
            <Modal key={reshreshKey} isOpen={open} hideTabs injectFields={injectFields} onSend={onSend} onClose={() => setOpen(false)} tabs={tabs} defaultTab='Update' />
            <Stack direction="row" className={styles.Stack} justifyContent="center" alignItems="center" spacing={1}>
                <UploadImage 
                key={reshreshKey} 
                onChange={handleSetImage} 
                error={errors?.image}
                /> 
                <TextField 
                    id="standard-basic" 
                    fullWidth 
                    label="Key" 
                    error={!!errors?.term}
                    helperText={errors?.term}
                    name="term" 
                    value={formData.term || ''} 
                    variant="standard" 
                    onChange={handleOnChange}
                />
                <TextField 
                    id="standard-basic" 
                    ref={definitionRef} 
                    error={!!errors?.definition}
                    helperText={errors?.definition}
                    fullWidth 
                    label="Value" 
                    name="definition" 
                    value={formData.definition || ''} 
                    variant="standard"
                    onClick={handleShowPopover}
                    onChange={handleOnChange}
                />
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
                <WordsList handleUpdate={handleUpdate} handleDelete={handleDelete} words={words?.list || []}/>
            </Stack>
        </>
    )
}