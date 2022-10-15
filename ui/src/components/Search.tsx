import { FC, useState, useRef, ReactElement, ChangeEvent } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';

import SearchIcon from '@mui/icons-material/Search';

import SearchList from './SearchList';

const SearchModules: FC = () => {
  const [display, setDisplay] = useState('none');
  const [searchValue, setSearchValue] = useState('');
  const searchWrapper = useRef<HTMLDivElement | null>(null);
  const searchInput = useRef<HTMLDivElement | null>(null);

  return (
    <Search ref={searchWrapper} onClick={() => setDisplay('block')}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={searchValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
        placeholder="Search modules"
        inputProps={{ 'aria-label': 'search' }}
      />
      <SearchList
        searchValue={searchValue}
        referWrapp={searchWrapper}
        display={display}
        onSetDisplay={(val) => setDisplay(val)}
      />
    </Search>
  );
};

export default SearchModules;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
