import React, { useState, useEffect } from 'react'
import List from '@mui/material/List';
import EditIcon from '@mui/icons-material/Edit';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import PhotoIcon from '@mui/icons-material/Photo';
import Avatar from '@mui/material/Avatar';
import { IconButton } from "@mui/material";
import { HOST } from '../../../constants';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import styles from './styles.scss';

export default function WordsList(props) {
    const { words, handleDelete, setOffset, handleUpdate } = props;

    const handleLazyLoading = ({ target }) => {
      if ((target.scrollHeight - target.scrollTop) < target.clientHeight) setOffset(prev => prev + 1)
    }

    return (
        <List className={styles.listBlock} onScroll={handleLazyLoading}>
            {words?.map(word => (
                <ListItem
                  key={word?.id}
                  secondaryAction={
                    <>
                      <IconButton sx={{ marginRight: 1 }} onClick={() => handleUpdate(word)} edge="end" aria-label="delete">
                          <EditIcon />
                      </IconButton>
                      <IconButton sx={{ marginRight: 1 }} onClick={() => handleDelete(word.id)} edge="end" aria-label="delete">
                          <DeleteIcon />
                      </IconButton>
                    </> 
              }
              >
                <ListItemAvatar>
                  <Avatar 
                    src      = {word?.imageUrl ? `${HOST}${word?.imageUrl}` : null} 
                    children = {<PhotoIcon />} 
                  />
                </ListItemAvatar>
                <ListItemText
                  className={styles.textField}
                  primary={word?.term}
                  secondary={word?.definition}
                />
              </ListItem>
            ))}
        </List>
    )
}

WordsList.propTypes = {
  words        : PropTypes.array.isRequired,
  handleDelete : PropTypes.func.isRequired,
  handleUpdate : PropTypes.func.isRequired
}