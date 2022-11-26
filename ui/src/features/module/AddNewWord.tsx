import translate, { setCORS } from 'google-translate-api-browser';

import { PhotoCamera } from '@mui/icons-material';
import { Stack, TextField, Button, IconButton, Avatar, Box } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import ClearIcon from '@mui/icons-material/Clear';

import { useAppDispatch } from '../../store/store';
import { getToken } from '../../utils/functions';
import { getUserInfoSelector } from '../user/userSlice';

import { CreateWordWithImg, createWord, getWordsInfo } from './moduleSlice';

interface RespTranslate {
  text: string;
  pronunciation: string;
  from: {
    language: {
      didYouMean: boolean;
      iso: string;
    };
    text: {
      autoCorrected: boolean;
      value: string;
      didYouMean: boolean;
    };
  };
}
interface Props {
  id: string;
}

const AddNewWord: FC<Props> = ({ id }) => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [photoToggle, setPhotoToggle] = useState(false);
  const [file, setFile] = useState<File>();
  const { isAuthorized, user } = useSelector(getUserInfoSelector);
  const { page } = useSelector(getWordsInfo);
  const dispatch = useAppDispatch();
  const token = getToken();

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  setCORS('http://cors-anywhere.herokuapp.com/');
  useEffect(() => {
    if (term.length > 1 && token) {
      clearTimeout(searchTimeout);
      setSearchTimeout(
        setTimeout(() => {
          if (definition.length === 0) {
            translate(term, { to: user.lang })
              .then((res: RespTranslate) => {
                if (definition.length === 0 && res.text !== term) {
                  setDefinition(res.text);
                }
              })
              .catch(() => {
                if (definition.length === 0) {
                  setDefinition('');
                }
              });
          }
        }, 1000)
      );
    }
  }, [term]);

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) {
      return;
    }

    if (token) {
      setFile(input.files[0]);
      setPhotoToggle(true);
    }
  };

  const onHandleSubmit = () => {
    if (token) {
      if (file) {
        const formData = new FormData();
        formData.append('avatar', file);

        dispatch(
          CreateWordWithImg({
            token,
            id,
            body: {
              img: formData,
              moduleId: id,
              term,
              definition,
            },
          })
        );
      } else {
        dispatch(
          createWord({
            token,
            id,
            page,
            body: {
              moduleId: id,
              term,
              definition,
              imageUrl: '',
            },
          })
        );
      }
      setFile(undefined);
      setPhotoToggle(false);
      setTerm('');
      setDefinition('');
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
              onChange={(e) => {
                setTerm(e.target.value);
              }}
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
                {photoToggle && file ? <Avatar alt="word cover" src={URL.createObjectURL(file)} /> : <PhotoCamera />}
              </IconButton>
              {photoToggle && (
                <ClearIcon
                  onClick={() => {
                    setFile(undefined);
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
