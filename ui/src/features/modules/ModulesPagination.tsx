import { Pagination } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { getUserInfoSelector } from '../user/userSlice';
import { useAppDispatch } from '../../store/store';

import { getToken } from '../../utils/functions';

import { getModuleInfo, loadModules } from './modulesSlice';

const ModulePagination: FC = () => {
  const { totalCount, page } = useSelector(getModuleInfo);
  const { isAuthorized } = useSelector(getUserInfoSelector);
  const dispatch = useAppDispatch();
  const token = getToken();

  const handleOnChange = (page: number) => {
    if (token) {
      dispatch(loadModules({ page, token }));
    }
  };

  return (
    <>
      {isAuthorized && totalCount > 12 ? (
        <Pagination
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, page: number) => handleOnChange(page)}
          sx={{ display: 'flex', justifyContent: 'center' }}
          count={(totalCount - (totalCount % 12)) / 12 + 1}
          color="primary"
        />
      ) : null}
    </>
  );
};

export default ModulePagination;
