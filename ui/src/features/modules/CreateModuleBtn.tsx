import { Button } from '@mui/material';
import { FC } from 'react';

import { useSelector } from 'react-redux';

import { openModal } from '../form/formSlice';

import { getUserInfoSelector } from '../user/userSlice';
import { useAppDispatch } from '../../store/store';

const CreateModuleBtn: FC = () => {
  const { isAuthorized } = useSelector(getUserInfoSelector);
  const dispatch = useAppDispatch();

  return (
    <>
      {isAuthorized ? (
        <>
          <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>Or</div>
          <Button onClick={() => dispatch(openModal('mod'))} sx={{ m: '10px' }} size="large" variant="contained">
            Create new module
          </Button>
        </>
      ) : null}
    </>
  );
};

export default CreateModuleBtn;
