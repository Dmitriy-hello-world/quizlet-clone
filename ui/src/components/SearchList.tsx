import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ListItem, ListItemButton, ListItemText, List } from '@mui/material';

import { Link } from 'react-router-dom';

import { filterModulesByName, getFilteredModules, getModules } from '../features/modules/modulesSlice';
import { useAppDispatch } from '../store/store';

import { getToken } from './../utils/functions';

interface Props {
  display: string;
  onSetDisplay: (val: string) => void;
  referWrapp: React.MutableRefObject<HTMLDivElement | null>;
  searchValue: string;
}

const SearchList: FC<Props> = ({ searchValue, referWrapp, display, onSetDisplay }) => {
  const modules = useSelector(getFilteredModules);
  const dispatch = useAppDispatch();
  const token = getToken();

  const closeList = (e: Event) => {
    if (referWrapp && e.target) {
      if ((referWrapp.current as HTMLDivElement).contains(e.target as Node)) {
        console.log('click on component');
      } else {
        onSetDisplay('none');
      }
    }
  };

  useEffect(() => {
    if (display === 'block') {
      window.addEventListener('click', closeList);
    }

    return () => {
      window.removeEventListener('click', closeList);
    };
  }, [display]);

  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  useEffect(() => {
    if (searchValue.length > 1 && token) {
      clearTimeout(searchTimeout);
      setSearchTimeout(
        setTimeout(() => {
          dispatch(filterModulesByName({ name: searchValue, token }));
        }, 500)
      );
    }
  }, [searchValue]);

  return (
    <List style={{ display }} sx={ListStyled} aria-label="contacts">
      {modules.map((module) => {
        return (
          <ListItem key={module.id} disablePadding>
            <Link to={`/personal/${module.name}`} style={{ color: 'white', width: '100%', textDecoration: 'none' }}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }} primary={module.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SearchList;

const ListStyled = {
  position: 'absolute',
  top: '53px',
  left: 0,
  width: '100%',
  maxHeight: '300px',
  overflowY: 'scroll',
  overflowX: 'hidden',
  bgcolor: 'rgba(25, 118, 210, .7)',
  transition: 'all 0.5s',
  borderRadius: '0 0 5px 5px',
  '::-webkit-scrollbar': {
    width: '4px',
  },
  '::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 5px grey',
    borderRadius: '10px',
  },
  '::-webkit-scrollbar-thumb': {
    background: 'grey',
    borderRadius: '10px',
  },
};
