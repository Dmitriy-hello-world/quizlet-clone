import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { IconButton } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PropTypes from 'prop-types'
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
      document.addEventListener('keydown', handleKeydown);

      return () => document.removeEventListener('keydown', handleKeydown)
  }, [ formData, injectFields, currentTab ])

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
        id="outlined-basic"
        {...field}
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
        {tabs[currentTab].map((field) => fieldTypes[field?.type || 'string'](field))}
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
