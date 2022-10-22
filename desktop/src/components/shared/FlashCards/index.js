import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
    const { cards, onResponse = () => {} } = props
    const [ current, setCurrent ] = useState(0)
    const [ cardsState, setCardsState ] = useState(cards);
    const [ refreshKey, setRefresh ] = useState(new Date())
    const [ isFlipped, setFlipped ] = useState(false);

    const handleSkipCard = () => setCurrent(prev => prev + 1 > cardsState?.length - 1 ? 0 : ++prev)

    const handleResponse = (result) => {
        setFlipped(false)
        onResponse({ id: cardsState[current]?.id, response: result });

        if (result) {
            setCardsState(prev => prev.filter(({ id }) => id !== cardsState[current]?.id))
        }

        handleSkipCard()
        return setRefresh(new Date());
    }

    useEffect(() => {
        setCardsState(cards)
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
                {cardsState[current]?.imageUrl ? <CardMedia component="img" className={styles.image} height="200" image={`${HOST}${cardsState[current]?.imageUrl}`}/> : null}
                    <CardContent>
                        <Typography className={styles.cardText} gutterBottom variant="h5" component="div">
                            {cardsState[current]?.term || handleSkipCard()}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={cx(styles.flipCardBack, { [styles.rotate]: !isFlipped })}>
                <CardActionArea sx={{ height: '100%', width: '100%' }}>
                {cardsState[current]?.imageUrl ? <CardMedia component="img" className={styles.image} height="200" image={`${HOST}${cardsState[current]?.imageUrl}`}/> : null}
                    <CardContent>
                        <Typography className={styles.cardText} gutterBottom variant="h5" component="div">
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