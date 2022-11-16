import { Box } from '@mui/material';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { getWords, getWordsInfo } from '../../features/module/moduleSlice';

import FlashCard from './FlashCards';
import FlashCardsBtns from './flashCardsBtns';

const FlashCardsSlider: FC = () => {
  const [slideOffset, setSlideOffset] = useState(0);
  const words = useSelector(getWords);
  const { totalCount } = useSelector(getWordsInfo);

  return (
    <Box sx={SliderStyled}>
      <Box sx={SliderWindowStyled}>
        <Box sx={{ ...SliderInnerStyled, width: `${745 * totalCount}px`, transform: `translateX(-${slideOffset}px)` }}>
          {words.map((word, i) => {
            return <FlashCard width={745} key={i} word={word} />;
          })}
        </Box>
      </Box>
      <FlashCardsBtns
        length={words.length}
        totalCount={totalCount}
        iterator={slideOffset}
        setIterator={(n: number) => setSlideOffset(n)}
      />
    </Box>
  );
};

export default FlashCardsSlider;

const SliderStyled = {
  width: '100%',
};

const SliderWindowStyled = {
  width: '100%',
  overflow: 'hidden',
};

const SliderInnerStyled = {
  display: 'flex',
  flexDirection: 'row',
  transition: 'all 0.5s',
};
