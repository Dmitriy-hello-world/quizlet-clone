import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from '@mui/material';
import { FC } from 'react';

import frontEnd from '../assets/img/frontend.jpg';
import tester from '../assets/img/tester.jpg';
import backend from '../assets/img/backend.jpg';

const AboutUs: FC = () => {
  return (
    <Box sx={AboutUsStyled}>
      <Typography variant="h3" sx={{ color: '#2f55d4', textAlign: 'center', marginBottom: '15px' }} gutterBottom>
        Our Team
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px' }}>
        <Card sx={{ width: 300 }}>
          <CardActionArea>
            <CardMedia component="img" height="300" image={frontEnd} alt="frontend" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Dmitriy Nikitenko
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Front-end Developer
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link sx={{ textDecoration: 'none' }} target="_blank" href="https://github.com/Dmitriy-hello-world">
              <Button size="small" color="primary">
                GitHub
              </Button>
            </Link>
            <Link sx={{ textDecoration: 'none' }} target="_blank" href="https://t.me/Nikitenko_Dmitriy">
              <Button size="small" color="primary">
                Telegram
              </Button>
            </Link>
          </CardActions>
        </Card>
        <Card sx={{ width: 300 }}>
          <CardActionArea>
            <CardMedia component="img" height="300" image={backend} alt="frontend" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Dmytro Halushka
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Back-end developer
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link sx={{ textDecoration: 'none' }} target="_blank" href="https://github.com/ZGltYQ">
              <Button size="small" color="primary">
                GitHub
              </Button>
            </Link>
            <Link sx={{ textDecoration: 'none' }} target="_blank" href="https://t.me/ZGltYQ">
              <Button size="small" color="primary">
                Telegram
              </Button>
            </Link>
          </CardActions>
        </Card>
        <Card sx={{ width: 300 }}>
          <CardActionArea>
            <CardMedia component="img" height="300" image={tester} alt="frontend" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Diana Nosach
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manual QA
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link sx={{ textDecoration: 'none' }} target="_blank" href="https://t.me/kudidiani">
              <Button size="small" color="primary">
                Telegram
              </Button>
            </Link>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default AboutUs;

const AboutUsStyled = {
  width: '1440px',
  minHeight: '50vh',
  margin: '0 auto',
  padding: '50px',
};
