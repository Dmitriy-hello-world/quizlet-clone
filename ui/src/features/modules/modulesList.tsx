import { Box } from '@mui/material';
import { FC, useEffect } from 'react';

import { useSelector } from 'react-redux';

import Card from '../../components/Card';

import { useAppDispatch } from '../../store/store';
import { getToken } from '../../utils/functions';
import { getUserInfoSelector } from '../user/userSlice';

import { getModules, loadModules } from './modulesSlice';

const ModuleList: FC = () => {
  const modules = useSelector(getModules);
  const dispatch = useAppDispatch();
  const token = getToken();
  const { isAuthorized } = useSelector(getUserInfoSelector);

  useEffect(() => {
    if (token && isAuthorized) {
      dispatch(loadModules(token));
    }
  }, [token, isAuthorized, dispatch]);

  return (
    <Box sx={listStyled}>
      {isAuthorized
        ? modules.map((module) => <Card key={module.id} title={module.name} description={module.description} />)
        : null}
    </Box>
  );
};

export default ModuleList;

const listStyled = {
  padding: '50px',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, auto)',
  gridTemplateRows: 'auto',
  gridAutoRows: 'auto',
  gap: '50px',
  justifyItems: 'center',
};
