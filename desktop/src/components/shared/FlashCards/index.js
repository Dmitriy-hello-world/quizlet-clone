import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button';
import React, { useState, useEffect, useMemo } from 'react'
import cx from 'classnames'
import styles from './styles.scss'


export default function FlashCards(props) {
    const { cards, onResponse = () => {} } = props
    const [ current, setCurrent ] = useState(0)
    const [ cardsState, setCardsState ] = useState(cards);
    const [ refreshKey, setRefresh ] = useState(new Date())
    const [ isFlipped, setFlipped ] = useState(false);

    const handleResponse = (result) => {
        setFlipped(false)
        onResponse({ id: cardsState[current]?.id, response: result });
        setRefresh(new Date());

        if (result) {
            setCardsState(prev => [
                ...prev.slice(0, current),
                ...prev.slice(current + 1)
            ])
        }

        return setCurrent(prev => prev + 1 > cardsState?.length - 1 ? 0 : ++prev)
    }

    useEffect(() => {
        setCardsState(cards)
    }, [ cards ])

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
                <CardActionArea sx={{ height: '100%', width: '100%' }}>
                {cardsState[current]?.imageUrl ? <CardMedia component="img" height="140" image={cardsState[current]?.imageUrl}/> : null}
                    <CardContent>
                        <Typography className={styles.cardText} gutterBottom variant="h5" component="div">
                            {cardsState[current]?.term}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={cx(styles.flipCardBack, { [styles.rotate]: !isFlipped })}>
                <CardActionArea sx={{ height: '100%', width: '100%' }}>
                {cardsState[current]?.imageUrl ? <CardMedia component="img" height="140" image={cardsState[current]?.imageUrl}/> : null}
                    <CardContent>
                        <Typography className={styles.cardText} gutterBottom variant="h5" component="div">
                            {cardsState[current]?.definition}
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