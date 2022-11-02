import { ChangeEvent, FC, useState, useRef } from 'react';
import { Avatar, Box, Button, Checkbox, FormControlLabel, IconButton, Stack, TextField } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';

import { PhotoCamera } from '@mui/icons-material';

import { WordType } from '../features/module/moduleSlice';

import { getToken } from '../utils/functions';

interface Props {
  word: WordType;
  setVisibleType: (str: 'word' | 'delete' | 'change') => void;
}

const WordInnerChange: FC<Props> = ({ word, setVisibleType }) => {
  const [term, setTerm] = useState(word.term);
  const [definition, setDefinition] = useState(word.definition);
  const [keepImg, setKeepImg] = useState(false);
  const [photoToggle, setPhotoToggle] = useState(false);
  const [file, setFile] = useState<File>();
  const token = getToken();

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

        //   dispatch(
        //     CreateWordWithImg({
        //       token,
        //       id,
        //       body: {
        //         img: formData,
        //         moduleId: id,
        //         term,
        //         definition,
        //       },
        //     })
        //   );
        // } else {
        //   dispatch(
        //     createWord({
        //       token,
        //       id,
        //       page,
        //       body: {
        //         moduleId: id,
        //         term,
        //         definition,
        //         imageUrl: '',
        //       },
        //     })
        //   );
      }
      setFile(undefined);
      setPhotoToggle(false);
      setTerm('');
      setDefinition('');
    }
  };

  return (
    <>
      <Stack sx={{ width: '100%' }} flexDirection="row" justifyContent="space-between">
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
          <FormControlLabel
            sx={{ margin: '0 10px' }}
            control={
              <Checkbox
                value={keepImg}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFile(undefined);
                    setPhotoToggle(false);
                  }
                  setKeepImg(e.target.checked);
                }}
              />
            }
            label="Keep old image"
          />
        </Box>

        <Stack sx={{ width: '200px', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button onClick={() => setVisibleType('word')} variant="contained" size="large">
            Cancel
          </Button>
          <Button onClick={() => onHandleSubmit()} variant="contained" size="large">
            Save
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default WordInnerChange;

const inputStyled = {
  width: '350px',
};

const wrapStyled = {
  width: '100%',
  margin: '20px auto 0 auto',
};
