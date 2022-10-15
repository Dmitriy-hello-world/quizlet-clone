import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useGetModuleQuery } from "../../../services/modules"
import { Stack, TextField, IconButton } from "@mui/material";
import { useCreateWordMutation, useDeleteWordMutation, useGetWordsQuery, useUpdateWordMutation } from "../../../services/words";
import { WORD_UPDATE_TABS } from "../../../constants";
import AddBoxIcon from '@mui/icons-material/AddBox';
import List from '@mui/material/List';
import EditIcon from '@mui/icons-material/Edit';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '../../shared/Modal'
import StyleIcon from '@mui/icons-material/Style';
import { FlashcardArray } from "react-quizlet-flashcard";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import styles from './styles.scss';


export default function Module(props) {
    const { id } = useParams();
    const { data: module } = useGetModuleQuery(id);
    const [ createWord ] = useCreateWordMutation();
    const [ updateWord ] = useUpdateWordMutation();
    const [ deleteWord ] = useDeleteWordMutation();
    const [ formData, setFormData ] = useState({});
    const [ open, setOpen ] = useState(false);
    const [ startLearn, setStartLearn ] = useState(false);
    const [ injectFields, setInjectFields ] = useState({});
    const [ tabs, setTabs ] = useState({
        Update: WORD_UPDATE_TABS
    })

    const { data: words, isLoading, isError, refetch } = useGetWordsQuery({ moduleId: id })

    console.log({module, words})

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

    if (startLearn) {
        const cards = words?.list.map((word, i) => ({
            id: i,
            front: word?.term,
            back: word?.definition,
        }))

        return (
            <>
            <IconButton color="primary" onClick={() => setStartLearn(false)} size="large" className={styles.stopButton}><ArrowCircleLeftIcon fontSize="large" /></IconButton>
            <div className={styles.cardsBlock}>
                <FlashcardArray cards={cards} />
            </div>
            </>
        )
    }

    return (
        <>
        <IconButton color="primary" onClick={() => setStartLearn(true)} size="large" className={styles.startButton}><StyleIcon fontSize="large" /></IconButton>
        <Modal isOpen={open} hideTabs injectFields={injectFields} onSend={onSend} onClose={() => setOpen(false)} tabs={tabs} defaultTab='Update' />
        <Stack direction="row" className={styles.Stack} justifyContent="center" alignItems="center" spacing={1}>
            <TextField id="standard-basic" fullWidth label="Key" name="term" value={formData.term} variant="standard" onChange={handleOnChange}/>
            <TextField id="standard-basic" fullWidth label="Value" name="definition" value={formData.definition} variant="standard" onChange={handleOnChange}/>
            <IconButton color="primary" size="large" onClick={handleSend}><AddBoxIcon sx={{ fontSize: 45 }} /></IconButton>
        </Stack>
        <Stack direction="col" justifyContent="center" alignItems="center">
            <List className={styles.listBlock}>
                {words?.list?.map(word => (
                    <ListItem
                    key={word.id}
                    secondaryAction={
                        <>
                        <IconButton sx={{ marginRight: 1 }} onClick={() => handleUpdate(word.id)} edge="end" aria-label="delete">
                            <EditIcon />
                        </IconButton>
                        <IconButton sx={{ marginRight: 1 }} onClick={() => handleDelete(word.id)} edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                        </> 
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      className={styles.textField}
                      primary={word?.term}
                      secondary={word?.definition}
                    />
                  </ListItem>
                ))}
            </List>
        </Stack>
        </>
    )
}