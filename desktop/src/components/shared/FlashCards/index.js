import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CampaignIcon from '@mui/icons-material/Campaign';
import { HOST } from '../../../constants';
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import styles from './styles.scss'

export default function FlashCards(props) {
    const { cards, onResponse = () => {}, offset, setOffset } = props
    const [ current, setCurrent ] = useState(0)
    const [ cardsState, setCardsState ] = useState(cards);
    const [ makeFetch, setMakeFetch ] = useState(true);
    const [ refreshKey, setRefresh ] = useState(new Date())
    const [ isFlipped, setFlipped ] = useState(false);

    const handleSkipCard = () => setCurrent(prev => (prev + 1) > (cardsState?.length - 1) ? 0 : prev + 1)

    const handleResponse = (result) => {
        setFlipped(false)
        onResponse({ id: cardsState[current]?.id, response: result });

        if (result) setCardsState(prev => prev.filter(({ id }) => id !== prev[current]?.id))
        else handleSkipCard()

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

    const handleCampaignClick = (event) => {
        event.stopPropagation()
        return window.electron.send('say', cardsState[current]?.term)
    }

    if (cardsState?.length === 0) return (
        <div className={styles.cardsBlock}>
            <Typography className={styles.cardText} gutterBottom variant="h5" component="div">
                You already know everything!
            </Typography>
        </div>
    )

    return (
        <div className={styles.cardsBlock}>
        <div key={refreshKey} className={styles.flipCard} onClick={() => setFlipped(prev => !prev)}>
            <Card className={cx(styles.flipCardFront, { [styles.rotate]: isFlipped })}>
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
            <Card className={cx(styles.flipCardBack, { [styles.rotate]: !isFlipped })}>
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
        </div>
        <div className={cx(styles.buttonBlock, { [styles.fade]: isFlipped })}>
            <Button variant="contained" onClick={() => handleResponse(false)} color="error">Wrong</Button>
            <Button variant="contained" onClick={() => handleResponse(true)} color="success">Right</Button>
        </div>
        </div>     
    )
}

FlashCards.propTypes = {
    cards      : PropTypes.array.isRequired,
    onResponse : PropTypes.func.isRequired
}