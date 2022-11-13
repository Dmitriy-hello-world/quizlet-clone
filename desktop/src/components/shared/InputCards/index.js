import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, TextField, InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CampaignIcon from '@mui/icons-material/Campaign';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { HOST } from '../../../constants';
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './styles.scss'

export default function InputCards(props) {
    const { cards, onResponse = () => {}, offset, setOffset } = props
    const [ current, setCurrent ] = useState(0)
    const [ cardsState, setCardsState ] = useState(cards);
    const [ makeFetch, setMakeFetch ] = useState(true);
    const [ value, setValue ] = useState('');
    const [ color, setColor ] = useState('')
    const [ refreshKey, setRefresh ] = useState(new Date())
    const [ isFlipped, setFlipped ] = useState(false);

    const handleKeydown = (event) => {
        switch(event.key) {
            case 'Enter': {
                handleResponse()
                break;
            }
            case 'ArrowRight': {
                handleNext()
                break;
            }
            default: {
                break;
            }
        }
    }

    const handleSkipCard = () => setCurrent(prev => (prev + 1) > (cardsState?.length - 1) ? 0 : prev + 1)

    const checkValue = () => {
        return value.trim().toLowerCase().replace(/[^a-zA-Z0-9\-]/g, '') === cardsState[current]?.term.trim().toLowerCase().replace(/[^a-zA-Z0-9\-]/g, '')
    }

    const handleResponse = () => {
        setFlipped(true);
        const result = checkValue()
        result ? setColor('success') : setColor('error');
        onResponse({ id: cardsState[current]?.id, response: result });
    }

    const handleNext = () => {
        if (color === 'success') setCardsState(prev => prev.filter(({ id }) => id !== prev[current]?.id))
        else handleSkipCard()
        setFlipped(false)
        setColor('');
        setValue('')
        return setRefresh(new Date());
    }

    useEffect(() => {
        if (current + 1 === cardsState?.length && makeFetch) setOffset(prev => prev + 1)
    }, [ cardsState, current ])

    useEffect(() => {
        if (!cards?.length) setMakeFetch(false);
        setCardsState(prev => {
            if (!offset) return cards

            return Array.from(new Set([ ...prev, ...cards ])).sort(() => Math.round(Math.random()) - Math.round(Math.random()))
        })
    }, [ cards ])

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);

        return () => document.removeEventListener('keydown', handleKeydown);
    }, [ value, cardsState, current ])

    const handleCampaignClick = (event) => {
        event.stopPropagation()
        return window.electron.send('say', cardsState[current]?.term)
    }

    const handleInput = ({ target }) => setValue(target.value)

    if (cardsState?.length === 0) return (
        <div className={styles.cardsBlock}>
            <Typography className={styles.cardText} gutterBottom variant="h5" component="div">
                You already know everything!
            </Typography>
        </div>
    )

    return (
        <div className={styles.cardsBlock}>
            <div className={cx(styles.buttonBlock, { [styles.fade]: isFlipped })}>
                <IconButton color="primary" onClick={handleNext}>
                    <KeyboardDoubleArrowRightIcon sx={{ fontSize: 40 }} />
                </IconButton>
            </div>   
        <div key={refreshKey} className={styles.flipCard}>
            <Card className={cx(styles.flipCardFront, { [styles.rotate]: isFlipped })}>
                <CardActionArea sx={{ height: '100%', width: '100%' }}>
                {cardsState[current]?.imageUrl ? <div className={styles.image} style={{ background: `url(${HOST}${cardsState[current]?.imageUrl})` }}/> : null}
                    <CardContent>
                        <Typography 
                            { ...!cardsState[current]?.imageUrl ? { style: { maxHeight: 300 } } : {} }
                            className={styles.cardText} 
                            gutterBottom 
                            variant="h5" 
                            component="div"
                        >
                            {cardsState[current]?.definition || handleSkipCard()}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={cx(styles.flipCardBack, { [styles.rotate]: !isFlipped })}>
                <IconButton color="primary" className={styles.campaign} onClick={handleCampaignClick} component="label">
                    <CampaignIcon />
                </IconButton>
                <CardActionArea sx={{ height: '100%', width: '100%' }}>
                {cardsState[current]?.imageUrl ? <div className={styles.image} style={{ background: `url(${HOST}${cardsState[current]?.imageUrl})` }}/> : null}
                    <CardContent>
                        <Typography 
                            { ...!cardsState[current]?.imageUrl ? { style: { maxHeight: 300 } } : {} }
                            className={styles.cardText} 
                            gutterBottom 
                            variant="h5" 
                            component="div"
                        >
                            {cardsState[current]?.term || handleSkipCard()}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
            <TextField fullWidth sx={{ marginTop: 5 }} color={color} focused value={value} onChange={handleInput} label="Response" InputProps={{
                endAdornment: 
                <InputAdornment position="end">
                    <IconButton aria-label="delete" size="large" onClick={handleResponse} color="primary">
                        <SendIcon />
                    </IconButton>
                </InputAdornment>,
            }} />
        </div>     
    )
}

InputCards.propTypes = {
    cards      : PropTypes.array.isRequired,
    onResponse : PropTypes.func.isRequired
}