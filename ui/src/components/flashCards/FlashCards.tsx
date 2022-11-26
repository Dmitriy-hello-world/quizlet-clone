import { FC, useEffect, useState } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

import ReactBoxFlip from 'react-box-flip';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';

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

  const handleUseSpeech = (text: string) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    setIsFlip(false);
  }, [word]);

  return (
    <div onClick={() => setIsFlip(!isFlip)} style={{ width, height: '545px' }}>
      <ReactBoxFlip isVertical={true} isFlipped={isFlip}>
        <Card sx={FlashCardStyled}>
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
          <VolumeUpIcon
            onClick={(e) => {
              e.stopPropagation();
              handleUseSpeech(word.definition);
            }}
            sx={VolumeUpStyled}
          />
        </Card>
        <Card sx={FlashCardStyled}>
          <CardActionArea sx={{ textAlign: 'center', width: '100%', height: '100%' }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {word.term}
              </Typography>
            </CardContent>
          </CardActionArea>
          <VolumeUpIcon
            onClick={(e) => {
              e.stopPropagation();
              handleUseSpeech(word.term);
            }}
            sx={VolumeUpStyled}
          />
        </Card>
      </ReactBoxFlip>
    </div>
  );
};

export default FlashCard;

const FlashCardStyled = {
  position: 'relative',
  border: '1px solid rgba(0,0,0,0.5)',
  background: '#435f7a',
  width: '745px',
  height: '545px',
};

const VolumeUpStyled = {
  position: 'absolute',
  top: '5px',
  right: '5px',
  cursor: 'pointer',
};
