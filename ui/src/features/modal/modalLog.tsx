import { ErrorMessage } from '@hookform/error-message';
import { Box, Button, Input, Stack } from '@mui/material';
import { FC, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import SendIcon from '@mui/icons-material/Send';

type FormValues = {
  emailInput: string;
  password: string;
};

const ModalLogIn: FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      emailInput: '',
      password: '',
    },
  });
  const myForm = useRef<HTMLFormElement | null>(null);
  const resetForm = () => {
    reset();
    myForm.current?.reset();
  };

  return (
    <form
      ref={myForm}
      onSubmit={handleSubmit((data) => {
        console.log(data);
        resetForm();
      })}
    >
      <Box sx={{ marginRight: '30px', minWidth: 300, maxWidth: 400 }}>
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
          render={({ field: { onChange, onBlur } }) => (
            <label>
              {errors.emailInput ? (
                <span style={{ color: 'red' }}>
                  <ErrorMessage errors={errors} name="emailInput" />
                </span>
              ) : (
                <span>E-mail:</span>
              )}
              <Input sx={{ marginBottom: '20px' }} type="email" fullWidth={true} onChange={onChange} onBlur={onBlur} />
            </label>
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: 'Type your password!',
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
        <Button type="submit" fullWidth={true} sx={{ width: 200 }} variant="contained" endIcon={<SendIcon />}>
          Enter
        </Button>
      </Stack>
    </form>
  );
};

export default ModalLogIn;
