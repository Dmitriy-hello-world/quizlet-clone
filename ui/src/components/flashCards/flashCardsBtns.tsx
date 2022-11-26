import { Stack } from '@mui/system';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
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
  slidesRefElement: RefObject<HTMLDivElement>;
}

const FlashCardsBtns: FC<Props> = ({ iterator, setIterator, totalCount, length, slidesRefElement }) => {
  const dispatch = useAppDispatch();
  const prevBtn = useRef<HTMLButtonElement>(null);
  const nextBtn = useRef<HTMLButtonElement>(null);
  const [page, setPage] = useState(1);
  const { id = '' } = useParams();
  const token = getToken();
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

  useEffect(() => {
    const setUpListeners = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && prevBtn.current) {
        prevBtn.current.click();
      } else if (e.key === 'ArrowRight' && nextBtn.current) {
        nextBtn.current.click();
      } else if (e.keyCode === 32) {
        e.preventDefault();
        if (slidesRefElement.current) {
          const matrix = new WebKitCSSMatrix(window.getComputedStyle(slidesRefElement.current).transform);
          const id = Math.abs(Math.round(matrix.m41 / 745));
          if (slidesRefElement.current.children[id]) {
            (slidesRefElement.current.children[id] as HTMLElement).click();
          }
        }
      }
    };

    window.addEventListener('keydown', setUpListeners);
    return () => {
      window.removeEventListener('keydown', setUpListeners);
    };
  }, []);

  return (
    <Stack sx={BtnsStyled} direction="row" spacing={2}>
      <Button
        ref={prevBtn}
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
        ref={nextBtn}
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
