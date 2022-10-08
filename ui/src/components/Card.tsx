import { FC } from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';

interface Props {
  title: string;
  description: string;
}

const ModuleCard: FC<Props> = ({ title, description }) => {
  return (
    <Card sx={{ width: 300, height: 150, overflow: 'hidden' }}>
      <CardActionArea>
        <CardContent>
          <Typography
            sx={{ height: '50px', overflow: 'hidden', lineHeight: '50px' }}
            gutterBottom
            variant="h5"
            component="div"
          >
            {title}
          </Typography>
          <Typography
            sx={{ height: '90px', overflow: 'hidden', lineHeight: '15px' }}
            variant="body2"
            color="text.secondary"
          >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ModuleCard;
