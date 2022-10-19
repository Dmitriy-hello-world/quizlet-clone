import { FC } from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  description: string;
}

const ModuleCard: FC<Props> = ({ title, description }) => {
  return (
    <Link to={`/personal/${title}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 300, height: 150, overflow: 'hidden' }}>
        <CardActionArea>
          <CardContent>
            <Typography
              sx={{ textDecoration: 'none', height: '50px', overflow: 'hidden', lineHeight: '50px' }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {title}
            </Typography>
            <Typography
              sx={{ textDecoration: 'none', height: '90px', overflow: 'hidden', lineHeight: '15px' }}
              variant="body2"
              color="text.secondary"
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ModuleCard;
