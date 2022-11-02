import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import UploadImage from '../UploadImage'
import React, { useState, useEffect } from 'react'
import styles from './styles.scss'

export default function Modal(props) {
  const { tabs, isOpen, onSend, hideTabs, injectFields, onClose, defaultTab } = props
  const [ currentTab, setCurrentTab ] = useState(defaultTab)
  const [ formData, setFormData ] = useState(Object.fromEntries(tabs[defaultTab]?.map(tab => tab?.value ? [tab?.name, tab?.value] : [])))

  const changeTab = (tab) => () => setCurrentTab(tab)

  const handleKeydown = (event) => {
    switch(event.key) {
        case 'Enter': {
            onSend({ ...formData, ...injectFields }, currentTab)
            break;
        }
        default: {
            break;
        }
      }
    }

  useEffect(() => {
      if (isOpen) document.addEventListener('keydown', handleKeydown);

      return () => document.removeEventListener('keydown', handleKeydown)
  }, [ formData, isOpen, injectFields, currentTab ])

  const fieldTypes = {
    string: (field) => (
      <TextField
        key={field.name}
        className={styles.TextField}
        onChange={(event) =>
          setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
          }))
        }
        {...field}
        id="outlined-basic"
        value={formData?.[field.name] || ''}
        variant="outlined"
      />
    ),
    image: (field) => (
      <div key={field.name} className={styles.imageField}>
        <UploadImage onChange={(event) => setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.files[0],
          }))} {...field} />
      </div>
    ),
    boolean: (field) => (
      <FormControlLabel 
        key={field.name} 
        control={
        <Checkbox 
          defaultChecked={field?.defaultChecked}
          checked={formData[field?.name]} 
          onChange={(event) => setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
          }))} 
        />
        } 
        label={field?.label} 
      />
    ),
    select: (field) => (
      <FormControl key={field.name} sx={{ marginBottom: 2 }} fullWidth>
        <InputLabel id={field.name}>{field?.label}</InputLabel>
        <Select
          {...field}
          labelId={field.name}
          id={field.name}
          value={formData?.[field.name] || ''}
          label={field?.label}
          onChange={(event) => setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
          }))}
        >
          {field?.values.map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
        </Select>
      </FormControl>
    )
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Box className={styles.HeaderBox}>
          <div className={styles.modalTitle}>{currentTab}</div>
          <div className={styles.headerButtons}>
            {!hideTabs ? 
            Object.keys(tabs).filter((tab) => tab !== currentTab).map((tab) => (
                <Button key={tab} onClick={changeTab(tab)} variant="contained">
                  {tab}
                </Button>
              )) 
            : null}
          </div>
        </Box>
      </DialogTitle>
      <Box className={styles.FieldsBox} component="form">
        {tabs[currentTab].map(({ typeField, ...field }) => fieldTypes[typeField || 'string'](field))}
      </Box>
      <Button onClick={() => onSend({ ...formData, ...injectFields }, currentTab)} className={styles.sendButton} variant="contained">
        Send
      </Button>
    </Dialog>
  )
}

Modal.propTypes = {
  tabs         : PropTypes.object.isRequired,
  isOpen       : PropTypes.bool.isRequired,
  onSend       : PropTypes.func.isRequired,
  hideTabs     : PropTypes.bool,
  injectFields : PropTypes.object,
  onClose      : PropTypes.func,
  defaultTab   : PropTypes.string.isRequired
}

Modal.defaultProps = {
  hideTabs     : false,
  injectFields : {},
  onClose      : () => {}
}
