import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, CardActionArea, Box, Stack, Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '../../store/store';

import { getToken } from '../../utils/functions';

import { deleteModule, getModuleInfo, ModuleType } from './modulesSlice';

interface Props {
  module: ModuleType;
}

const ModuleCard: FC<Props> = ({ module: { name, description, id } }) => {
  const dispatch = useAppDispatch();
  const token = getToken();
  const { page } = useSelector(getModuleInfo);
  const [display, setDisplay] = useState('none');
  const [isDelete, setIsDelete] = useState(false);
  return (
    <Box sx={{ position: 'relative' }}>
      {!isDelete ? (
        <>
          <Link to={`/personal/${id}`} style={{ textDecoration: 'none' }}>
            <Card
              sx={{ width: 300, height: 150, overflow: 'hidden' }}
              onMouseEnter={() => {
                setDisplay('block');
              }}
              onMouseLeave={() => {
                setDisplay('none');
              }}
            >
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
          <DeleteForeverIcon
            onMouseEnter={() => {
              setDisplay('block');
            }}
            onClick={() => setIsDelete(true)}
            color="primary"
            sx={{ ...ImgStyled, display }}
          />
        </>
      ) : (
        <Card sx={{ width: 300, height: 150, overflow: 'hidden' }}>
          <CardContent>
            <Typography
              sx={{ textDecoration: 'none', height: '50px', overflow: 'hidden', lineHeight: '50px' }}
              gutterBottom
              variant="h5"
              component="div"
            >
              Delete this module?
            </Typography>
            <Stack sx={{ height: '90px' }} direction="row" justifyContent="space-between">
              <Button
                onClick={() => {
                  if (token) {
                    dispatch(
                      deleteModule({
                        token,
                        id,
                        page,
                      })
                    );
                  }
                }}
                sx={{ height: '45px', width: '120px' }}
                variant="outlined"
                color="error"
              >
                Yes
              </Button>
              <Button
                onClick={() => setIsDelete(false)}
                sx={{ height: '45px', width: '120px' }}
                variant="outlined"
                color="success"
              >
                No
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ModuleCard;

const ImgStyled = {
  padding: '2px',
  width: '35px',
  cursor: 'pointer',
  position: 'absolute',
  top: '5px',
  right: '5px',
};
