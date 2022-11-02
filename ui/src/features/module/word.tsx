import { FC, useState } from 'react';
import { Stack } from '@mui/material';

import WordInner from '../../components/wordInner';

import WordDeleteInner from '../../components/wordDeleteInner';

import WordInnerChange from '../../components/wordInnerChange';

import { WordType } from './moduleSlice';

interface Props {
  word: WordType;
}

const Word: FC<Props> = ({ word }) => {
  const [display, setDisplay] = useState('none');
  const [visibleType, setVisibleType] = useState<'word' | 'delete' | 'change'>('word');

  return (
    <Stack
      onMouseEnter={() => {
        setDisplay('block');
      }}
      onMouseLeave={() => {
        setDisplay('none');
      }}
      alignItems="center"
      flexDirection="row"
      flexWrap="wrap"
      sx={WordStyled}
    >
      {visibleType === 'word' && (
        <WordInner
          word={word}
          setDisplay={(str: string) => setDisplay(str)}
          setVisibleType={(str: 'word' | 'delete' | 'change') => setVisibleType(str)}
          display={display}
        />
      )}
      {visibleType === 'delete' && (
        <WordDeleteInner word={word} setVisibleType={(str: 'word' | 'delete' | 'change') => setVisibleType(str)} />
      )}
      {visibleType === 'change' && (
        <WordInnerChange word={word} setVisibleType={(str: 'word' | 'delete' | 'change') => setVisibleType(str)} />
      )}
    </Stack>
  );
};

export default Word;

const WordStyled = {
  position: 'relative',
  padding: '10px 20px',
  color: 'white',
  minHeight: '50px',
  width: '800px',
  background: '#304278',
  border: '1px solid grey',
  borderRadius: '8px',
};
