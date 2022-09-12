import { FC, useState } from 'react';

import { Box, Input, Button, Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

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
  const { handleSubmit, control, getValues, reset } = useForm<FormValues>();
  const [color, setColor] = useState<string>('#094682');

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
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <label>
                Name:
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
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <label>
                Second Name:
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
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <label>
                E-mail:
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
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <label>
                password:
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
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <label>
                confirm password:
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
