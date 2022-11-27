import { FC } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { ReactComponent as HowItWorksImg } from '../assets/svg/reshot-icon-rocket-4ES9NTZMYX.svg';
const HowItWork: FC = () => {
  return (
    <Box sx={HowItWorkStyled}>
      <Typography variant="h3" sx={{ color: '#2f55d4', textAlign: 'center', marginBottom: '15px' }} gutterBottom>
        How it works?
      </Typography>
      <Box sx={HowItWorksWrapper}>
        <HowItWorksImg style={{ width: '512px', height: '512px', textAlign: 'center', marginLeft: '150px' }} />
        <Box sx={{ width: '50%' }}>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ width: '1.5em', height: '1.5em' }} color="success" />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: '1.5rem' }}>Add your own word and definition</span>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ width: '1.5em', height: '1.5em' }} color="success" />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: '1.5rem' }}>Create flash cards with your words</span>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ width: '1.5em', height: '1.5em' }} color="success" />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: '1.5rem' }}>Sort your words in special modules</span>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ width: '1.5em', height: '1.5em' }} color="success" />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: '1.5rem' }}>Add any image to any words</span>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ width: '1.5em', height: '1.5em' }} color="success" />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: '1.5rem' }}>Check your personal progress</span>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ width: '1.5em', height: '1.5em' }} color="success" />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: '1.5rem' }}>Learn words anywhere</span>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ width: '1.5em', height: '1.5em' }} color="success" />
              </ListItemIcon>
              <ListItemText>
                <span style={{ fontSize: '1.5rem' }}>Spent your time in ours funny games</span>
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default HowItWork;

const HowItWorkStyled = {
  background: '#f8f9fa',
  minHeight: '50vh',
  with: '1440px',
  padding: '50px',
  margin: '0 auto',
};

const HowItWorksWrapper = {
  display: 'flex',
  justifyContent: 'space-between',
};
