import { Divider } from '@mui/material';
import { FC } from 'react';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import { WordType } from '../features/module/moduleSlice';
import { SERVER_URL } from '../store/configAPI';

interface Props {
  word: WordType;
  setDisplay: (str: string) => void;
  setVisibleType: (str: 'word' | 'delete' | 'change') => void;
  display: string;
}

const WordInner: FC<Props> = ({ word, setDisplay, setVisibleType, display }) => {
  return (
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
        onClick={() => {
          setVisibleType('change');
        }}
        color="action"
        sx={{ ...ImgStyled, display, right: '35px' }}
      />
      <DeleteForeverIcon
        onMouseEnter={() => {
          setDisplay('block');
        }}
        onClick={() => setVisibleType('delete')}
        color="action"
        sx={{ ...ImgStyled, display }}
      />
    </>
  );
};

export default WordInner;

const ImgStyled = {
  padding: '2px',
  width: '35px',
  cursor: 'pointer',
  position: 'absolute',
  top: '5px',
  right: '5px',
};
