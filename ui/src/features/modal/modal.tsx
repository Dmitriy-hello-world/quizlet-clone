import { FC } from 'react';
import { Box, Modal } from '@mui/material';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../store/store';

import { closeModal, modalInfo } from './modalSlice';
import ModalLogIn from './modalLog';
import ModalReg from './modalReg';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BasicModal: FC = () => {
  const dispatch = useAppDispatch();
  const { open, type } = useSelector(modalInfo);
  const handleClose = () => dispatch(closeModal());

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{type === 'log' ? <ModalLogIn /> : <ModalReg />}</Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
