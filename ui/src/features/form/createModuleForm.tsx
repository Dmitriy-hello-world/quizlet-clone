import { ErrorMessage } from '@hookform/error-message';
import { Box, Button, Input, Stack, TextField } from '@mui/material';
import { FC, useRef } from 'react';
import CreateIcon from '@mui/icons-material/Create';
import { useForm, Controller } from 'react-hook-form';

import { useAppDispatch } from '../../store/store';

import { getToken } from '../../utils/functions';

import { createModule } from './formSlice';

export type ModFormValues = {
  name: string;
  description: string;
};

const CreateModuleForm: FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ModFormValues>({
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const myForm = useRef<HTMLFormElement | null>(null);
  const resetForm = () => {
    reset();
    myForm.current?.reset();
  };
  const dispatch = useAppDispatch();
  const token = getToken();

  return (
    <form
      ref={myForm}
      onSubmit={handleSubmit((data) => {
        if (token) {
          dispatch(createModule({ token, name: data.name, description: data.description }));
        }
        resetForm();
      })}
    >
      <Box sx={{ marginRight: '30px', minWidth: 300, maxWidth: 400 }}>
        <Controller
          control={control}
          name="name"
          rules={{
            required: 'Type module name!',
          }}
          render={({ field: { onChange, onBlur } }) => (
            <label>
              {errors.name ? (
                <span style={{ color: 'red' }}>
                  <ErrorMessage errors={errors} name="name" />
                </span>
              ) : (
                <span>Module name:</span>
              )}
              <Input sx={{ marginBottom: '20px' }} type="text" fullWidth={true} onChange={onChange} onBlur={onBlur} />
            </label>
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur } }) => (
            <label>
              <span>description:</span>
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                fullWidth={true}
                onChange={onChange}
                onBlur={onBlur}
              />
            </label>
          )}
        />
      </Box>
      <Stack sx={{ marginTop: '10px' }} direction="row" textAlign="center" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => {
            resetForm();
          }}
        >
          Reset
        </Button>
        <Button type="submit" fullWidth={true} sx={{ width: 200 }} variant="contained" endIcon={<CreateIcon />}>
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default CreateModuleForm;
