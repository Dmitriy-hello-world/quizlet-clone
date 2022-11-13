import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import styles from './styles.scss'

export default function ModuleCard(props) {
    const [ open, setOpen ] = useState(false);
    const { id, name, description, onDelete, onEdit } = props

    const handleDelete = () => {
      onDelete(id)
      setOpen(false)
    }

    const handleClose = () => setOpen(false)

  return (
    <>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Do you really want to delete "${name}" module ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Card className={styles.card} sx={{ maxWidth: 300, minWidth: 250, m: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ wordBreak: 'break-all' }} variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link className={styles.moduleLink} to={`/module/${id}`}>Learn</Link>
          </Button>
        </CardActions>
        <IconButton className={styles.removeButton} onClick={() => setOpen(true)}>
          <DeleteIcon />
        </IconButton>
        <IconButton className={styles.editButton} onClick={() => onEdit({ id, name, description })}>
          <EditIcon />
        </IconButton>
      </Card>
    </>
  );
}

ModuleCard.propTypes = {
  id          : PropTypes.string.isRequired,
  name        : PropTypes.string.isRequired,
  description : PropTypes.string,
  onDelete    : PropTypes.func.isRequired,
  onEdit      : PropTypes.func.isRequired
}

ModuleCard.defaultProps = {
  description : ''
}