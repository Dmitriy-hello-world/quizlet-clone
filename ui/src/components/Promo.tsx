import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

import { ReactComponent as PromoImg } from '../assets/svg/Startup_SVG.svg';
const Promo: FC = () => {
  return (
    <Box sx={PromoWrapStyled}>
      <Box sx={{ width: '50%', paddingTop: '140px' }}>
        <Typography sx={{ margin: 0 }} variant="h1" gutterBottom>
          Hisokacards
        </Typography>
        <Typography variant="h4" sx={{ color: '#2f55d4' }} gutterBottom>
          What does it mean?
        </Typography>
        <Typography variant="body2" gutterBottom>
          Hisokacards is the place where you can upgrade your languages skills for free, yeah you read right, absolutely
          free service for study new words with flash cards system and funny games. Want more? Welcome to Hisokacards!
        </Typography>
        <Link style={{ textDecoration: 'none' }} to="/personal">
          <Button variant="contained" sx={{ marginTop: '30px', width: '200px', height: '50px' }} endIcon={<SendIcon />}>
            get started
          </Button>
        </Link>
      </Box>
      <PromoImg style={{ width: '612px', height: '612px' }} />
    </Box>
  );
};

export default Promo;

const PromoWrapStyled = {
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: '1440px',
  height: '100vh',
  margin: '0 auto',
  padding: '150px 50px',
};
