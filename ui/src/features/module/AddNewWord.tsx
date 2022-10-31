import { PhotoCamera } from '@mui/icons-material';
import { Stack, TextField, Button, IconButton, Avatar, Box } from '@mui/material';
import { ChangeEvent, FC, useState } from 'react';
import { useSelector } from 'react-redux';

import ClearIcon from '@mui/icons-material/Clear';

import { useAppDispatch } from '../../store/store';
import { getToken } from '../../utils/functions';
import { getUserInfoSelector } from '../user/userSlice';

import { SERVER_URL } from '../../store/configAPI';

import { uploadImg, getCurrentUrl, deleteCurrentPhoto, createWord } from './moduleSlice';

interface Props {
  id: string;
}

const AddNewWord: FC<Props> = ({ id }) => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [photoToggle, setPhotoToggle] = useState(false);
  const { isAuthorized } = useSelector(getUserInfoSelector);
  const currentPhoto = useSelector(getCurrentUrl);
  const dispatch = useAppDispatch();
  const token = getToken();

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
      return;
    }

    const formData = new FormData();

    formData.append('avatar', input.files[0]);

    if (token) {
      dispatch(uploadImg({ token, body: formData }));
      setPhotoToggle(true);
    }
  };

  const onHandleSubmit = () => {
    if (token) {
      setPhotoToggle(false);
      setTerm('');
      setDefinition('');
      dispatch(
        createWord({
          token,
          body: {
            moduleId: id,
            term,
            definition,
            imageUrl: currentPhoto,
          },
        })
      );
    }
  };

  return (
    <>
      {isAuthorized && (
        <>
          <Stack sx={wrapStyled} flexDirection="row" justifyContent="space-between">
            <TextField
              sx={inputStyled}
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              id="standard-basic"
              label="Term"
              variant="standard"
            />
            <TextField
              sx={inputStyled}
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              id="standard-basic"
              label="Definition"
              variant="standard"
            />
          </Stack>
          <Stack sx={wrapStyled} flexDirection="row" justifyContent="space-between">
            <Box sx={{ display: 'flex', alignItems: 'end' }}>
              <IconButton
                sx={{ height: '42px', width: '42px' }}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input onChange={(e) => onHandleChange(e)} hidden accept="image/*" type="file" />
                {!photoToggle ? <PhotoCamera /> : <Avatar alt="word cover" src={SERVER_URL + currentPhoto} />}
              </IconButton>
              {photoToggle && (
                <ClearIcon
                  onClick={() => {
                    dispatch(deleteCurrentPhoto());
                    setPhotoToggle(false);
                  }}
                  sx={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
              )}
            </Box>

            <Button onClick={() => onHandleSubmit()} variant="contained" size="large">
              Save
            </Button>
          </Stack>
        </>
      )}
    </>
  );
};

export default AddNewWord;

const wrapStyled = {
  width: '850px',
  margin: '20px auto 0 auto',
};

const inputStyled = {
  width: '400px',
};
