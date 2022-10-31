import { FC } from 'react';
import { Divider, Stack } from '@mui/material';

import { SERVER_URL } from '../../store/configAPI';

import { WordType } from './moduleSlice';

interface Props {
  word: WordType;
}

const Word: FC<Props> = ({ word }) => {
  return (
    <Stack flexDirection="row" sx={WordStyled}>
      <div style={{ width: '200px', textAlign: 'start' }}>{word.term}</div>
      <Divider
        sx={{ margin: '0 5px', width: '2px', height: 'inherit', background: 'grey', borderRadius: '2px' }}
        orientation="vertical"
      />
      <div
        style={{
          wordWrap: 'break-word',
          width: '300px',
          textAlign: 'start',
        }}
      >
        {word.definition}
      </div>
      {word.imageUrl !== '' && (
        <img
          style={{ width: '100px', marginLeft: '10px', height: '100%' }}
          src={SERVER_URL + word.imageUrl}
          alt="word cover"
        />
      )}
    </Stack>
  );
};

export default Word;

const WordStyled = {
  padding: '10px 20px',
  color: 'white',
  minHeight: '50px',
  width: '800px',
  background: '#304278',
  border: '1px solid grey',
  borderRadius: '8px',
};
