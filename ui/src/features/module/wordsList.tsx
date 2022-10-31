import { FC } from 'react';
import { Divider, List, Stack } from '@mui/material';

import { useSelector } from 'react-redux';

import { getUserInfoSelector } from '../user/userSlice';

import { SERVER_URL } from '../../store/configAPI';

import { WordType } from './moduleSlice';

interface Props {
  words: WordType[];
}

const WordsList: FC<Props> = ({ words }) => {
  const { isAuthorized } = useSelector(getUserInfoSelector);

  return (
    <>
      {isAuthorized && (
        <List sx={ListStyled}>
          {words.map((word) => {
            return (
              <li key={word.id}>
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
                    <img style={{ width: '100px' }} src={SERVER_URL + word.imageUrl} alt="word cover" />
                  )}
                </Stack>
              </li>
            );
          })}
        </List>
      )}
    </>
  );
};

export default WordsList;

const ListStyled = {
  marginTop: '50px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  justifyContent: 'center',
  alignItems: 'center',
};

const WordStyled = {
  padding: '10px 20px',
  color: 'white',
  minHeight: '50px',
  width: '800px',
  background: '#304278',
  border: '1px solid grey',
  borderRadius: '8px',
};
