import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IconButton } from "@mui/material";
import FlashCards from "../../shared/FlashCards";
import { useGetWordsQuery, useResponseWordMutation } from "../../../services/words";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './styles.scss'

export default function CardsGame() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ responseWord ] = useResponseWordMutation();
    const { data, isLoading, isError, refetch } = useGetWordsQuery({ moduleId: id, forgotten: true });

    useEffect(() => {
        refetch()
    }, [])
    
    const handleReturn = () => navigate(`/module/${id}`)

    const handleResponse = async ({ id, response }) => await responseWord({ id, response });

    return (
        <>
            <IconButton color="primary" onClick={handleReturn} size="large" className={styles.stopButton}>
                <ArrowCircleLeftIcon fontSize="large" />
            </IconButton>
            <div className={styles.cardsBlock}>
                {isLoading ? 
                <CircularProgress sx={{ position: 'absolute', top: '45%', left: '50%' }}/> : 
                <FlashCards onResponse={handleResponse} cards={data?.list} />}
            </div>
        </>
    )
}