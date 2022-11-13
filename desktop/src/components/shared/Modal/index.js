import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import FormData from '../../base/FormData'
import React, { useState, useEffect } from 'react'
import styles from './styles.scss'

export default function Modal(props) {
  const { tabs, isOpen, onSend, hideTabs, injectFields, onClose, defaultTab } = props
  const [ currentTab, setCurrentTab ] = useState(defaultTab)
  const [ formData, setFormData ] = useState({})

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
        <FormData 
          fields           = {tabs?.[currentTab]} 
          formData         = {formData} 
          setFormData      = {setFormData} 
          wrapperStyles    = {styles.FieldsBox}
          WrapperComponent = {Box}
        />
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
