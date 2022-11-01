import { FC } from 'react';
import { List } from '@mui/material';

import { useSelector } from 'react-redux';

import { getUserInfoSelector } from '../user/userSlice';

import { WordType } from './moduleSlice';
import Word from './word';

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
                <Word word={word} />
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
  height: '650px',
  marginTop: '50px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflowY: 'scroll',
  '::-webkit-scrollbar': {
    width: '4px',
  },
  '::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 5px grey',
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb': {
    background: '#304278',
    borderRadius: '10px',
  },
};
