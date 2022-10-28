import { FC, useState } from 'react';

import { useSelector } from 'react-redux';

import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import { Box, Divider, IconButton } from '@mui/material';

import { openModal } from '../form/formSlice';

import { getUserInfoSelector } from '../user/userSlice';
import { useAppDispatch } from '../../store/store';

import RenameInput from './renameInput';

interface Props {
  name: string;
  description: string;
}

const ModuleTitle: FC<Props> = ({ name = '', description = '' }) => {
  const { isAuthorized } = useSelector(getUserInfoSelector);
  const dispatch = useAppDispatch();
  const [rename, setRename] = useState(false);

  return (
    <h2>
      {isAuthorized ? (
        <>
          {rename ? (
            <RenameInput setRename={() => setRename(false)} />
          ) : (
            <>
              <span style={{ color: '#1976D2' }}>{name}</span>
              <IconButton onClick={() => setRename(true)} aria-label="rename">
                <DriveFileRenameOutlineOutlinedIcon sx={{ color: 'black' }} />
              </IconButton>
              <Divider sx={{ width: '430px', margin: '0 auto 10px auto' }} />
              <Box
                sx={{ maxWidth: '400px', margin: '0 auto', fontSize: '12px', textAlign: 'center', fontWeight: '300' }}
              >
                {description}
              </Box>
            </>
          )}
        </>
      ) : (
        <span>
          Sorry, at first you need to{' '}
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer', color: '#1976D2' }}
            onClick={() => dispatch(openModal('log'))}
          >
            log in!
          </span>
        </span>
      )}
    </h2>
  );
};

export default ModuleTitle;
