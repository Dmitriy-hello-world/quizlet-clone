import { FC } from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

import { ModuleType } from './modulesSlice';

interface Props {
  module: ModuleType;
}

const ModuleCard: FC<Props> = ({ module: { name, description, id } }) => {
  return (
    <Link to={`/personal/${id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 300, height: 150, overflow: 'hidden' }}>
        <CardActionArea>
          <CardContent>
            <Typography
              sx={{ textDecoration: 'none', height: '50px', overflow: 'hidden', lineHeight: '50px' }}
              gutterBottom
              variant="h5"
              component="div"
            >
              {name}
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
