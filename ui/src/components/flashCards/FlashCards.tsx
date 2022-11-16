import { FC, useEffect, useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import ReactBoxFlip from 'react-box-flip';

import { WordType } from '../../features/module/moduleSlice';
import { SERVER_URL } from '../../store/configAPI';

interface Props {
  word: WordType;
  width: number;
}

const FlashCard: FC<Props> = ({
  word = {
    createdAt: '',
    definition: '',
    id: '',
    imageUrl: '',
    moduleId: '',
    repeatAt: '',
    term: '',
    updatedAt: '',
  },
  width,
}) => {
  const [isFlip, setIsFlip] = useState(false);

  useEffect(() => {
    setIsFlip(false);
  }, [word]);

  return (
    <div style={{ width, height: '545px' }}>
      <ReactBoxFlip isVertical={true} isFlipped={isFlip}>
        <Card onClick={() => setIsFlip(true)} sx={FlashCardStyled}>
          <CardActionArea sx={{ textAlign: 'center', width: '100%', height: '100%' }}>
            {word.imageUrl !== '' && (
              <CardMedia
                component="img"
                sx={{ width: '240px', height: '240px', margin: '0 auto' }}
                image={SERVER_URL + word.imageUrl}
                alt={word.definition}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {word.definition}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card onClick={() => setIsFlip(false)} sx={FlashCardStyled}>
          <CardActionArea sx={{ textAlign: 'center', width: '100%', height: '100%' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {word.term}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </ReactBoxFlip>
    </div>
  );
};

export default FlashCard;

const FlashCardStyled = {
  border: '1px solid rgba(0,0,0,0.5)',
  background: '#435f7a',
  width: '745px',
  height: '545px',
};
