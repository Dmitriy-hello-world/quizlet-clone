import { FC, useState } from 'react';
import { Box, Avatar, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { ControllerRenderProps } from 'react-hook-form';

import { animals } from '../constants/animals';
import { FormValues } from '../features/modal/modalReg';

interface Props {
  field: ControllerRenderProps<FormValues, 'avatar'>;
  color: string;
}

const AnimalsList: FC<Props> = ({ color, field }) => {
  const [selectedName, setSelectedName] = useState<string>('');

  return (
    <Box sx={{ width: '400px' }}>
      <div>select avatar:</div>
      <RadioGroup
        sx={{ display: 'flex', flexWrap: 'wrap', width: '400px', flexDirection: 'row' }}
        defaultValue=""
        onChange={field.onChange}
      >
        {animals.map((Name) => {
          return (
            <FormControlLabel
              sx={{
                width: 44,
                height: 44,
                margin: '5px',
              }}
              key={Name}
              value={Name}
              control={<Radio style={{ display: 'none' }} />}
              label={
                <Avatar
                  onClick={() => setSelectedName(Name)}
                  sx={{
                    backgroundColor: `${selectedName === Name ? color : '#094682'}`,
                    width: 44,
                    height: 44,
                    cursor: 'pointer',
                    border: `${selectedName === Name ? '2px solid black' : 'none'}`,
                    borderRadius: '100%',
                  }}
                  src={`https://raw.githubusercontent.com/arvinpoddar/react-animals/master/src/animals/${Name}.png`}
                />
              }
            />
          );
        })}
      </RadioGroup>
    </Box>
  );
};

export default AnimalsList;
