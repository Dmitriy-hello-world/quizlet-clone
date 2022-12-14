import { FC, useRef } from 'react';

import { Box, Input, Button, Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import SendIcon from '@mui/icons-material/Send';

import { useAppDispatch } from '../../store/store';

import { createUser } from './formSlice';

export type FormValues = {
  firstName: string;
  secondName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const ModalReg: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      secondName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const myForm = useRef<HTMLFormElement | null>(null);
  const resetForm = () => {
    reset();
    myForm.current?.reset();
  };
  const dispatch = useAppDispatch();

  return (
    <form
      ref={myForm}
      onSubmit={handleSubmit((data) => {
        dispatch(createUser(data));
        resetForm();
      })}
    >
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ marginRight: '30px', minWidth: 300, maxWidth: 400 }}>
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: 'Type your Name!',
              maxLength: {
                value: 20,
                message: 'Max 20 letters!',
              },
              minLength: {
                value: 2,
                message: 'Min 2 letters!',
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <label>
                {errors.firstName ? (
                  <span style={{ color: 'red' }}>
                    <ErrorMessage errors={errors} name="firstName" />
                  </span>
                ) : (
                  <span>Name:</span>
                )}
                <Input sx={{ marginBottom: '20px' }} type="text" fullWidth={true} onChange={onChange} onBlur={onBlur} />
              </label>
            )}
          />
          <Controller
            control={control}
            name="secondName"
            rules={{
              required: 'Type your Surname!',
              maxLength: {
                value: 20,
                message: 'Max 20 letters!',
              },
              minLength: {
                value: 2,
                message: 'Min 2 letters!',
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <label>
                {errors.secondName ? (
                  <span style={{ color: 'red' }}>
                    <ErrorMessage errors={errors} name="secondName" />
                  </span>
                ) : (
                  <span>Second Name:</span>
                )}
                <Input sx={{ marginBottom: '20px' }} type="text" fullWidth={true} onChange={onChange} onBlur={onBlur} />
              </label>
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Type your E-mail!',
              pattern: {
                value: /^([A-Za-z0-9_-]+\.)*[A-Za-z0-9_-]+@[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*\.[A-Za-z]{2,6}$/,
                message: 'Your email must be like test@test.com',
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <label>
                {errors.email ? (
                  <span style={{ color: 'red' }}>
                    <ErrorMessage errors={errors} name="email" />
                  </span>
                ) : (
                  <span>E-mail:</span>
                )}
                <Input
                  sx={{ marginBottom: '20px' }}
                  type="email"
                  fullWidth={true}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </label>
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Type your password!',
              maxLength: {
                value: 34,
                message: 'Max 34 letters!',
              },
              pattern: {
                value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*][^\s]{9,}/,
                message: 'Your password must have capital letter, number and 8+ letters',
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <label>
                {errors.password ? (
                  <span style={{ color: 'red' }}>
                    <ErrorMessage errors={errors} name="password" />
                  </span>
                ) : (
                  <span>Password:</span>
                )}
                <Input
                  sx={{ marginBottom: '20px' }}
                  type="password"
                  fullWidth={true}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </label>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: 'Confirm your password!',
              pattern: {
                value: new RegExp(getValues('password')),
                message: 'Your passwords must be the same',
              },
            }}
            render={({ field: { onChange, onBlur } }) => (
              <label>
                {errors.confirmPassword ? (
                  <span style={{ color: 'red' }}>
                    <ErrorMessage errors={errors} name="confirmPassword" />
                  </span>
                ) : (
                  <span>Confirm password:</span>
                )}
                <Input
                  sx={{ marginBottom: '20px' }}
                  type="password"
                  fullWidth={true}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              </label>
            )}
          />
        </Box>
      </Box>
      <Stack direction="row" textAlign="center" spacing={2}>
        <Button
          variant="outlined"
          onClick={() => {
            resetForm();
          }}
        >
          Reset
        </Button>
        <Button type="submit" sx={{ width: 200 }} variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Stack>
    </form>
  );
};

export default ModalReg;
