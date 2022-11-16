import { FC } from 'react';

import { Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getUserInfoSelector } from '../user/userSlice';

interface Props {
  id: string;
}

const GamesBtns: FC<Props> = ({ id }) => {
  const { isAuthorized } = useSelector(getUserInfoSelector);

  return (
    <>
      {isAuthorized && (
        <Stack direction="row" spacing={2} justifyContent="center">
          <Link to={`/personal/${id}/flashCards`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined">FlashCards </Button>
          </Link>
          <Link to={`/personal/${id}/learning`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Learning </Button>
          </Link>
          <Link to={`/personal/${id}/findPair`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Find pair </Button>
          </Link>
          <Link to={`/personal/${id}/test`} style={{ textDecoration: 'none' }}>
            <Button variant="outlined">Test </Button>
          </Link>
        </Stack>
      )}
    </>
  );
};

export default GamesBtns;
