import { Stack } from '@mui/system';
import { FC, useState } from 'react';
import { Button } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../store/store';
import { loadWordsForCards } from '../../features/module/moduleSlice';
import { getToken } from '../../utils/functions';

interface Props {
  iterator: number;
  totalCount: number;
  length: number;
  setIterator: (n: number) => void;
}

const FlashCardsBtns: FC<Props> = ({ iterator, setIterator, totalCount, length }) => {
  const dispatch = useAppDispatch();
  const { id = '' } = useParams();
  const token = getToken();
  const [page, setPage] = useState(1);
  const maxPage = (totalCount - (totalCount % 20)) / 20 + 1;

  const handleSetIterator = (type: 'plus' | 'minus') => {
    if (type === 'plus') {
      if (iterator + 745 >= (length - 2) * 745) {
        if (token) {
          if (page + 1 <= maxPage) {
            setPage(page + 1);
            dispatch(loadWordsForCards({ token, id, page: page + 1 }));
          }
          setIterator(iterator + 745);
        }
      } else {
        setIterator(iterator + 745);
      }
    } else {
      if (iterator - 745 >= 0) {
        setIterator(iterator - 745);
      }
    }
  };

  return (
    <Stack sx={BtnsStyled} direction="row" spacing={2}>
      <Button
        disabled={iterator <= 0}
        onClick={() => handleSetIterator('minus')}
        size="large"
        variant="contained"
        startIcon={<ArrowBackIosNewIcon />}
      >
        Prev
      </Button>
      <span>
        {iterator / 745 + 1} / {totalCount}
      </span>
      <Button
        disabled={iterator >= (totalCount - 1) * 745}
        onClick={() => handleSetIterator('plus')}
        size="large"
        variant="contained"
        endIcon={<ArrowForwardIosIcon />}
      >
        Next
      </Button>
    </Stack>
  );
};

export default FlashCardsBtns;

const BtnsStyled = {
  width: '350px',
  margin: '20px auto',
  justifyContent: 'space-between',
  alignItems: 'center',
};
