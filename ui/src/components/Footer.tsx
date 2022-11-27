import { FC } from 'react';
import { Box, Typography } from '@mui/material';

const Footer: FC = () => {
  return (
    <Box sx={FooterStyled}>
      <Typography variant="body2" color="text.secondary">
        &copy; 2022
      </Typography>
    </Box>
  );
};

export default Footer;

const FooterStyled = {
  height: '50px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'grey',
};
