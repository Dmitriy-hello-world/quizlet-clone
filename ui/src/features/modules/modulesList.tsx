import { Box } from '@mui/material';
import { FC, useEffect } from 'react';

import { useSelector } from 'react-redux';

import Card from '../../components/Module';

import { useAppDispatch } from '../../store/store';
import { getToken } from '../../utils/functions';
import { getUserInfoSelector } from '../user/userSlice';

import { ReactComponent as Spinner } from '../../assets/svg/spinner.svg';

import { getModuleInfo, getModules, loadModules } from './modulesSlice';

const ModuleList: FC = () => {
  const modules = useSelector(getModules);
  const dispatch = useAppDispatch();
  const token = getToken();
  const { isAuthorized } = useSelector(getUserInfoSelector);
  const { status } = useSelector(getModuleInfo);

  useEffect(() => {
    if (token && isAuthorized) {
      dispatch(loadModules({ page: 1, token }));
    }
  }, [token, isAuthorized, dispatch]);

  return (
    <Box sx={listStyled}>
      {status === 'loading' && <Spinner style={spinnerStyled} />}
      {status === 'rejected' && (
        <h2 style={errorStyled}>
          Ops, something went wrong!{' '}
          <span
            style={{ cursor: 'pointer', textDecoration: 'underline', color: 'rgb(25, 118, 210)' }}
            onClick={() => {
              if (token) {
                dispatch(loadModules({ page: 1, token }));
              }
            }}
          >
            Try again
          </span>
        </h2>
      )}
      {isAuthorized && status !== 'loading' && status !== 'rejected'
        ? modules.map((module) => <Card key={module.id} title={module.name} description={module.description} />)
        : null}
    </Box>
  );
};

export default ModuleList;

const spinnerStyled = {
  gridColumn: '1 / 5',
  gridRow: '1 / 3',
  width: '300px',
  height: '300px',
};

const errorStyled = {
  gridColumn: '1 / 5',
  gridRow: '1 / 3',
};

const listStyled = {
  padding: '50px',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, auto)',
  gridTemplateRows: 'repeat(3, 150px)',
  gridAutoRows: 'auto',
  gap: '50px',
  justifyItems: 'center',
};
