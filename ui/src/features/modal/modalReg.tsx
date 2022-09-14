import { FC, useState } from 'react';

import { Box, Input, Button, Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import SendIcon from '@mui/icons-material/Send';

import ColorsList from '../../components/Colors';

import AnimalsList from './../../components/Animals';

export type FormValues = {
  firstName: string;
  secondName: string;
  emailInput: string;
  password: string;
  confirmPassword: string;
  avatar: string;
  color: string;
};

const ModalReg: FC = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FormValues>();
  const [color, setColor] = useState<string>('#094682');
  console.log(getValues('password'));

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
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
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <label>
                {errors.firstName ? (
                  <span style={{ color: 'red' }}>
                    <ErrorMessage errors={errors} name="firstName" />
                  </span>
                ) : (
                  <span>Name:</span>
                )}
                <Input
                  sx={{ marginBottom: '20px' }}
                  type="text"
                  fullWidth={true}
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
                />
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
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <label>
                {errors.secondName ? (
                  <span style={{ color: 'red' }}>
                    <ErrorMessage errors={errors} name="secondName" />
                  </span>
                ) : (
                  <span>Second Name:</span>
                )}
                <Input
                  sx={{ marginBottom: '20px' }}
                  type="text"
                  fullWidth={true}
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
                />
              </label>
            )}
          />
          <Controller
            control={control}
            name="emailInput"
            rules={{
              required: 'Type your E-mail!',
              pattern: {
                value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                message: 'Your email must be like test@test.com',
              },
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <label>
                {errors.emailInput ? (
                  <span style={{ color: 'red' }}>
                    <ErrorMessage errors={errors} name="emailInput" />
                  </span>
                ) : (
                  <span>E-mail:</span>
                )}
                <Input
                  sx={{ marginBottom: '20px' }}
                  type="email"
                  fullWidth={true}
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
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
            render={({ field: { onChange, onBlur, value, ref } }) => (
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
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
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
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <label>
                {errors.password ? (
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
                  onChange={onChange} // send value to hook form
                  onBlur={onBlur} // notify when input is touched/blur
                />
              </label>
            )}
          />
          <Controller
            control={control}
            name="color"
            render={({ field }) => (
              <ColorsList colorFromState={color} handleSetColor={(c: string) => setColor(c)} field={field} />
            )}
          />
        </Box>
        <Controller
          control={control}
          name="avatar"
          render={({ field }) => <AnimalsList color={color} field={field} />}
        />
      </Box>
      <Stack direction="row" textAlign="center" spacing={2}>
        <Button
          type="reset"
          variant="outlined"
          onClick={() => {
            reset();
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
