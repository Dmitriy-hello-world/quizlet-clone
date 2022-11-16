import { Box } from '@mui/material';
import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import FlashCardsSlider from '../components/flashCards/flashCardsSlider';
import { getWordsInfo, loadWordsForCards, resetWords, setPage } from '../features/module/moduleSlice';
import { useAppDispatch } from '../store/store';

import { getToken } from './../utils/functions';

const FlashCardsPage: FC = () => {
  const isLoad = useRef(true);
  const dispatch = useAppDispatch();
  const token = getToken();
  const { id = '' } = useParams();

  useEffect(() => {
    if (token && isLoad.current) {
      dispatch(resetWords());
      dispatch(loadWordsForCards({ id, token, page: 1 }));
      isLoad.current = false;
    }
    return () => {
      dispatch(setPage(1));
    };
  }, []);

  return (
    <Box sx={WrapperStyled}>
      <FlashCardsSlider />
    </Box>
  );
};

export default FlashCardsPage;

const WrapperStyled = {
  width: '745px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};
