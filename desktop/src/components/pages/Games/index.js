import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { IconButton } from "@mui/material";
import FlashCards from "../../shared/FlashCards";
import InputCards from '../../shared/InputCards';
import { useGetWordsQuery, useResponseWordMutation } from "../../../services/words";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { PER_PAGE } from '../../../constants';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './styles.scss'

export default function CardsGame() {
    const { id, type } = useParams();
    const navigate = useNavigate();
    const [ responseWord ] = useResponseWordMutation();
    const [ offset, setOffset ] = useState(0);
    const { data, isLoading } = useGetWordsQuery({ moduleId: id, forgotten: true, offset: offset * PER_PAGE }, {
        refetchOnMountOrArgChange : true,
        refetchOnReconnect: true
    });
    
    const handleReturn = () => navigate(`/module/${id}`)

    const handleResponse = async ({ id, response }) => await responseWord({ id, response });

    const renderSelectedGame = (type) => {
        return {
            'cards': <FlashCards onResponse={handleResponse} offset={offset} setOffset={setOffset} cards={data?.list} />,
            'inputs': <InputCards onResponse={handleResponse} offset={offset} setOffset={setOffset} cards={data?.list} />
        }[type]
    }

    return (
        <>
            <IconButton color="primary" onClick={handleReturn} size="large" className={styles.stopButton}>
                <ArrowCircleLeftIcon fontSize="large" />
            </IconButton>
            <div className={styles.cardsBlock}>
                {isLoading ? 
                <CircularProgress sx={{ position: 'absolute', top: '45%', left: '50%' }}/> : 
                renderSelectedGame(type)}
            </div>
        </>
    )
}