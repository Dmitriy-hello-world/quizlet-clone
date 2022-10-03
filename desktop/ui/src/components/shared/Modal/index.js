import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import styles from './styles.scss'

export default function Modal(props) {
  const { tabs, isOpen, onSend, onClose, defaultTab } = props
  const [ currentTab, setCurrentTab ] = useState(defaultTab)
  const [ formData, setFormData ] = useState({})

  const changeTab = (tab) => () => setCurrentTab(tab)

  const fieldTypes = {
    string: (field) => (<TextField
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
      variant="outlined"
    />),
    boolean: (field) => (<FormControlLabel 
      key={field.name} 
      control={<Checkbox 
      defaultChecked={field?.defaultChecked}
      checked={formData[field?.name]} 
      onChange={(event) => setFormData((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }))
    } 
    />} 
    label={field?.label} />)
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Box className={styles.HeaderBox}>
          <div className={styles.modalTitle}>{currentTab}</div>
          <div className={styles.headerButtons}>
            {Object.keys(tabs).filter((tab) => tab !== currentTab).map((tab) => (
                <Button key={tab} onClick={changeTab(tab)} variant="contained">
                  {tab}
                </Button>
              ))}
          </div>
        </Box>
      </DialogTitle>
      <Box className={styles.FieldsBox} component="form">
        {tabs[currentTab].map((field) => fieldTypes[field?.type || 'string'](field))}
      </Box>
      <Button
        onClick={() => onSend(formData, currentTab)}
        className={styles.sendButton}
        variant="contained"
      >
        Send
      </Button>
    </Dialog>
  )
}

Modal.propTypes = {
  tabs: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onSend: PropTypes.func.isRequired,
}
