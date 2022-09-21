import { FC } from 'react';
import { Box, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { ControllerRenderProps, FieldErrorsImpl } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';

import { FormValues } from '../features/form/formReg';
import { colors } from '../constants/animals';

interface Props {
  field: ControllerRenderProps<FormValues, 'color'>;
  handleSetColor: (color: string) => void;
  colorFromState: string;
  errors: FieldErrorsImpl<{
    firstName: string;
    secondName: string;
    emailInput: string;
    password: string;
    confirmPassword: string;
    avatar: string;
    color: string;
  }>;
}

const ColorsList: FC<Props> = ({ errors, field, handleSetColor, colorFromState }) => {
  return (
    <Box>
      {errors.color ? (
        <div style={{ color: 'red' }}>
          <ErrorMessage errors={errors} name="color" />
        </div>
      ) : (
        <div>select avatar color:</div>
      )}
      <RadioGroup
        sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}
        defaultValue=""
        onChange={field.onChange}
      >
        {colors.map((color: string) => {
          return (
            <FormControlLabel
              sx={{
                width: 34,
                height: 34,
                margin: '5px',
              }}
              key={color}
              value={color}
              control={<Radio style={{ display: 'none' }} />}
              label={
                <Box
                  onClick={() => handleSetColor(color)}
                  sx={{
                    backgroundColor: color,
                    width: 24,
                    height: 24,
                    border: colorFromState === color ? '1px solid black' : '1px solid grey',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                />
              }
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default ColorsList;
