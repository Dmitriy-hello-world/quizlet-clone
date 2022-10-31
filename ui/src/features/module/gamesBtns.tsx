import { FC } from 'react';

import { Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

import { getUserInfoSelector } from '../user/userSlice';

const GamesBtns: FC = () => {
  const { isAuthorized } = useSelector(getUserInfoSelector);

  return (
    <>
      {isAuthorized && (
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="outlined">FlashCards</Button>
          <Button variant="outlined">Learning</Button>
          <Button variant="outlined">Find pair</Button>
          <Button variant="outlined">Test</Button>
        </Stack>
      )}
    </>
  );
};

export default GamesBtns;
