import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, Stack, TextField } from '@mui/material';

import { useAppDispatch } from '../../store/store';

import { getToken } from '../../utils/functions';

import { getModule, updateModule } from './moduleSlice';

interface Props {
  setRename: () => void;
}

const RenameInput: FC<Props> = ({ setRename }) => {
  const [newName, setNewName] = useState('');
  const [descr, setDescr] = useState('');
  const { name, description, id } = useSelector(getModule);
  const dispatch = useAppDispatch();
  const token = getToken();

  useEffect(() => {
    setNewName(name);
    setDescr(description);
  }, [name, description]);

  return (
    <Stack sx={{ margin: '0 auto', width: '400px' }} spacing={2}>
      <Input fullWidth={true} onChange={(e) => setNewName(e.target.value)} type="text" value={newName} />
      <TextField
        fullWidth={true}
        id="outlined-multiline-flexible"
        label="Description"
        multiline
        maxRows={3}
        value={descr}
        onChange={(e) => {
          setDescr(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          if (name === newName && descr === description) {
            setRename();
          } else {
            if (token) {
              dispatch(
                updateModule({
                  id,
                  token,
                  body: {
                    name: newName,
                    description: descr,
                    private: true,
                    editedByOutsiders: false,
                  },
                })
              );
              setRename();
            }
          }
        }}
        variant="contained"
        size="medium"
      >
        Save
      </Button>
    </Stack>
  );
};

export default RenameInput;
