import { FC } from 'react';
import { Box, Modal } from '@mui/material';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../store/store';

import { ReactComponent as Spinner } from '../../assets/svg/spinner.svg';
import { ReactComponent as Check } from '../../assets/svg/check.svg';
import { ReactComponent as Failed } from '../../assets/svg/cancel.svg';

import { closeModal, modalInfo } from './formSlice';
import ModalLogIn from './formLog';
import ModalReg from './formReg';
import CreateModuleForm from './createModuleForm';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 400,
  maxWidth: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
  textAlign: 'center',
};

const BasicModal: FC = () => {
  const dispatch = useAppDispatch();
  const { open, type, status } = useSelector(modalInfo);
  const handleClose = () => dispatch(closeModal());

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {status === 'loading' ? <Spinner /> : null}
          {status === 'success' ? <Check /> : null}
          {status === 'rejected' ? <Failed /> : null}
          {status === 'idle' && type === 'log' ? <ModalLogIn /> : null}
          {status === 'idle' && type === 'reg' ? <ModalReg /> : null}
          {status === 'idle' && type === 'mod' ? <CreateModuleForm /> : null}
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
