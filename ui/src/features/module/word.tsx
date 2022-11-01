import { FC, useState } from 'react';
import { Button, Divider, Stack, Typography } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import { SERVER_URL } from '../../store/configAPI';

import { WordType } from './moduleSlice';

interface Props {
  word: WordType;
}

const Word: FC<Props> = ({ word }) => {
  const [display, setDisplay] = useState('none');
  const [isDelete, setIsDelete] = useState(false);

  return (
    <Stack
      onMouseEnter={() => {
        setDisplay('block');
      }}
      onMouseLeave={() => {
        setDisplay('none');
      }}
      alignItems="center"
      flexDirection="row"
      sx={WordStyled}
    >
      {!isDelete ? (
        <>
          <div style={{ width: '200px', textAlign: 'start' }}>{word.term}</div>
          <Divider
            sx={{ margin: '0 5px', width: '2px', height: 'inherit', background: 'grey', borderRadius: '2px' }}
            orientation="vertical"
          />
          <div
            style={{
              wordWrap: 'break-word',
              width: '300px',
              textAlign: 'start',
            }}
          >
            {word.definition}
          </div>
          {word.imageUrl !== '' && (
            <img
              style={{ width: '100px', marginLeft: '10px', height: '100%' }}
              src={SERVER_URL + word.imageUrl}
              alt="word cover"
            />
          )}
          <DriveFileRenameOutlineOutlinedIcon
            onMouseEnter={() => {
              setDisplay('block');
            }}
            // onClick={() => setIsDelete(true)}
            color="action"
            sx={{ ...ImgStyled, display, right: '35px' }}
          />
          <DeleteForeverIcon
            onMouseEnter={() => {
              setDisplay('block');
            }}
            onClick={() => setIsDelete(true)}
            color="action"
            sx={{ ...ImgStyled, display }}
          />
        </>
      ) : (
        <>
          <Typography
            sx={{ textDecoration: 'none', height: '45px', overflow: 'hidden', lineHeight: '45px' }}
            gutterBottom
            variant="h5"
            component="div"
          >
            Delete this word?
          </Typography>
          <Button
            onClick={() => {
              // if (token) {
              //   dispatch(
              //     deleteModule({
              //       token,
              //       id,
              //       page,
              //     })
              //   );
              // }
              console.log('yes');
            }}
            sx={{ height: '45px', width: '120px', margin: '0 50px' }}
            variant="contained"
            color="error"
          >
            Yes
          </Button>
          <Button
            onClick={() => setIsDelete(false)}
            sx={{ height: '45px', width: '120px' }}
            variant="contained"
            color="success"
          >
            No
          </Button>
        </>
      )}
    </Stack>
  );
};

export default Word;

const WordStyled = {
  position: 'relative',
  padding: '10px 20px',
  color: 'white',
  minHeight: '50px',
  width: '800px',
  background: '#304278',
  border: '1px solid grey',
  borderRadius: '8px',
};

const ImgStyled = {
  padding: '2px',
  width: '35px',
  cursor: 'pointer',
  position: 'absolute',
  top: '5px',
  right: '5px',
};
