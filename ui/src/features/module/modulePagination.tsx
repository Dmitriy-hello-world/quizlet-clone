import { Pagination } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';

import { getUserInfoSelector } from '../user/userSlice';
import { useAppDispatch } from '../../store/store';

import { getToken } from '../../utils/functions';

import { getWordsInfo, loadWords } from './moduleSlice';

interface Props {
  id: string;
}

const WordsPagination: FC<Props> = ({ id }) => {
  const { totalCount, page } = useSelector(getWordsInfo);
  const { isAuthorized } = useSelector(getUserInfoSelector);
  const dispatch = useAppDispatch();
  const token = getToken();

  const handleOnChange = (page: number) => {
    if (token) {
      dispatch(loadWords({ page, id, token }));
    }
  };

  return (
    <>
      {isAuthorized && totalCount > 8 ? (
        <Pagination
          page={page}
          onChange={(event: React.ChangeEvent<unknown>, page: number) => handleOnChange(page)}
          sx={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}
          count={(totalCount - (totalCount % 8)) / 8 + 1}
          color="primary"
        />
      ) : null}
    </>
  );
};

export default WordsPagination;
