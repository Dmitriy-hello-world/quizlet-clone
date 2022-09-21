import { useAppDispatch } from '../../store/store';

import { resetStatus } from './formSlice';

export const useResetStatus = (status: string) => {
  const dispatch = useAppDispatch();

  if (status === 'rejected' || status === 'success') {
    setTimeout(() => {
      dispatch(resetStatus());
    }, 1000);
  }
};
