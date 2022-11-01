import { FC, useEffect } from 'react';
import { Box } from '@mui/material';

import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '../store/store';

import { getModule, getWords, loadModule, loadWords } from '../features/module/moduleSlice';
import ModuleTitle from '../features/module/moduleTitle';
import GamesBtns from '../features/module/gamesBtns';
import AddNewWord from '../features/module/AddNewWord';

import WordsList from '../features/module/wordsList';

import WordsPagination from '../features/module/modulePagination';

import { getToken } from './../utils/functions';

const ModulePage: FC = () => {
  const dispatch = useAppDispatch();
  const { id = '' } = useParams();
  const token = getToken();
  const words = useSelector(getWords);
  const module = useSelector(getModule);

  useEffect(() => {
    if (token) {
      dispatch(loadWords({ id, page: 1, token }));
      dispatch(loadModule({ id, token }));
    }
  }, [id]);

  return (
    <Box sx={BoxStyled}>
      <ModuleTitle name={module.name} description={module.description} />
      <GamesBtns />
      <WordsList words={words} />
      <AddNewWord id={id} />
      <WordsPagination id={id} />
    </Box>
  );
};

export default ModulePage;

const BoxStyled = {
  padding: '50px',
  textAlign: 'center',
};
