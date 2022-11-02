import React, { useEffect, useState, useRef } from "react"
import { useSelector } from 'react-redux'
import { useParams } from "react-router-dom"
import { useGetModuleQuery } from "../../../services/modules"
import { Stack, TextField, IconButton, Typography } from "@mui/material";
import { useCreateWordMutation, useDeleteWordMutation, useGetWordsQuery, useUpdateWordMutation } from "../../../services/words";
import { useCreateImageMutation } from "../../../services/images";
import { WORD_UPDATE_TABS, PER_PAGE } from "../../../constants";
import AddBoxIcon from '@mui/icons-material/AddBox';
import WordsList from "../../shared/WordsList";
import { CircularProgress } from "@mui/material";
import Modal from '../../shared/Modal'
import Popover from '@mui/material/Popover';
import StyleIcon from '@mui/icons-material/Style';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import { useNavigate } from 'react-router-dom';
import PayloadValidator from "../../../utils/PayloadValidator";
import UploadImage from "../../shared/UploadImage";
import styles from './styles.scss';


const PV = new PayloadValidator({
    term : [ 'required', 'trim' ],
    definition : [ 'required', 'trim' ],
    image: [ { 'image-size': 200000 }, { 'image-type': [ 'image/jpeg', 'image/png', 'image/webp', 'image/jpg' ] } ]
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
    const [ offset, setOffset ] = useState(0);
    const user = useSelector(state => state.users);
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
                window.electron.send('translate', { value: formData?.term, lang: user?.lang });
            }
        }, 500)

        return () => {
            document.removeEventListener('keydown', handleKeydown)
            return clearTimeout(timeout)
        }
    }, [ formData ])

    const { data: words, isLoading } = useGetWordsQuery({ moduleId: id, offset: offset * PER_PAGE }, {
        refetchOnMountOrArgChange : true,
        refetchOnReconnect: true
    })

    const [ wordsList, setWordsList ] = useState(words?.list);

    useEffect(() => {
        setWordsList(prev => {
            if (offset === 0) return words?.list
            return Array.from(new Set([ ...(prev || []), ...(words?.list || []) ]))
        });
    }, [ offset, words ])

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
                const { data: createdWord } = await createWord({ moduleId: id, ...formData, imageUrl: url }).unwrap();
                setFormData(prev => Object.fromEntries(Object.entries(prev).map(([key]) => [key, ''])))
                setWordsList(prev => [ createdWord, ...prev ])
            } else {
                const { data: createdWord } = await createWord({ moduleId: id, ...formData }).unwrap();
                setFormData(prev => Object.fromEntries(Object.entries(prev).map(([key]) => [key, ''])))
                setWordsList(prev => [ createdWord, ...prev ])
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
        try {
            PV.validate(payload)
            if (payload?.image) {
                const url = await uploadImage(payload?.image)
                const { data: updatedWord } = await updateWord({ ...injectFields, ...payload, imageUrl: url }).unwrap();
                setWordsList(prev => prev.map(word => word?.id !== updatedWord?.id ? word : updatedWord))
                setOpen(false)
            } else {
                const { data: updatedWord } = await updateWord({ ...injectFields, ...payload }).unwrap();
                setWordsList(prev => prev.map(word => word?.id !== updatedWord?.id ? word : updatedWord))
                setOpen(false)
            }
        } catch(error) {
            if (error?.image) return setErrors({ image: error?.image })
            setTabs({
                Update: WORD_UPDATE_TABS.map(field => ({
                    ...field,
                    ...error?.[field?.name] ? { error: true, helperText: error?.[field?.name] } : {}
                }))
            })
        }   
    }

    const handleDelete = async (id) => {
        await deleteWord(id);
        setWordsList(prev => prev.filter((word) => word?.id !== id))
    }

    const handleStartGame = (type) => () => navigate(`/games/${type}/${id}`)

    const handlePopoverClick = (event) => {
        event.stopPropagation()
        setFormData(prev => ({
            ...prev,
            definition: translateValue
        }))
        setErrors({})
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
            <IconButton color="primary" onClick={handleStartGame('cards')} size="large" className={styles.startButton}>
                <StyleIcon fontSize="large" />
            </IconButton>
            <IconButton sx={{ marginTop: 10 }} color="primary" onClick={handleStartGame('inputs')} size="large" className={styles.startButton}>
                <KeyboardIcon fontSize="large" />
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
                    onChange={(event) => {
                        setAnchoreEl(null)
                        handleOnChange(event)
                    }}
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
                <WordsList handleUpdate={handleUpdate} setOffset={setOffset} handleDelete={handleDelete} words={wordsList || []}/>
            </Stack>
        </>
    )
}