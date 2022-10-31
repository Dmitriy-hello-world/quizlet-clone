import { FC } from 'react';

import { useSelector } from 'react-redux';

import { openModal } from '../form/formSlice';

import { getUserInfoSelector } from '../user/userSlice';
import { useAppDispatch } from '../../store/store';

const ModulesTitle: FC = () => {
  const { isAuthorized, user } = useSelector(getUserInfoSelector);
  const dispatch = useAppDispatch();

  return (
    <h2>
      {isAuthorized && user.firstName ? (
        <span>
          Hello <span style={{ color: '#1976D2' }}>{user.firstName}</span>! Select your module:
        </span>
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

export default ModulesTitle;
