import { Typography, Button } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { deleteWord, getWordsInfo, WordType } from '../features/module/moduleSlice';
import { useAppDispatch } from '../store/store';
import { getToken } from '../utils/functions';

interface Props {
  word: WordType;
  setVisibleType: (str: 'word' | 'delete' | 'change') => void;
}

const WordDeleteInner: FC<Props> = ({ word, setVisibleType }) => {
  const dispatch = useAppDispatch();
  const token = getToken();
  const { page } = useSelector(getWordsInfo);

  return (
    <>
      <Typography
        sx={{ textDecoration: 'none', height: '45px', overflow: 'hidden', lineHeight: '45px' }}
        gutterBottom
        variant="h5"
        component="div"
      >
        Delete this word?
      </Typography>
      <Button
        onClick={() => {
          if (token) {
            dispatch(
              deleteWord({
                token,
                id: word.id,
                moduleId: word.moduleId,
                page,
              })
            );
          }
        }}
        sx={{ height: '45px', width: '120px', margin: '0 50px' }}
        variant="contained"
        color="error"
      >
        Yes
      </Button>
      <Button
        onClick={() => setVisibleType('word')}
        sx={{ height: '45px', width: '120px' }}
        variant="contained"
        color="success"
      >
        No
      </Button>
    </>
  );
};

export default WordDeleteInner;
