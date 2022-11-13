import React, { useEffect } from 'react';
import { TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import UploadImage from '../../shared/UploadImage';
import styles from './styles.scss'
import cx from 'classnames'

const div = (props) => <div {...props}>{props?.children}</div>

export default function FormData(props) {
    const { fields, formData, setFormData, fieldStyles, wrapperStyles, WrapperComponent = div } = props;

    useEffect(() => {
      setFormData(Object.fromEntries(fields.map(field => [field?.name, field?.value])));
    }, [])

    const fieldTypes = {
        string: (field) => (
          <TextField
            key       = {field?.key || field.name}
            className = {cx(styles.fieldStyles, fieldStyles)}
            style     = {field?.style}
            id        = {field?.id || field.name}
            variant   = {field?.variant || 'outlined'}
            {...field}
            onChange  = {(event) => setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
            value     = {formData?.[field.name] || ''}
          />
        ),
        image: (field) => (
          <div key={field?.key || field.name} className = {cx(styles.fieldStyles, fieldStyles)} style={field?.style}>
            <UploadImage 
                {...field} 
                onChange={(event) => setFormData((prev) => ({ ...prev, [event.target.name]: event.target.files[0] }))} 
            />
          </div>
        ),
        boolean: (field) => (
          <FormControlLabel 
            key       = {field?.key || field.name} 
            label     = {field?.label}
            className = {cx(styles.fieldStyles, fieldStyles)}
            style     = {field?.style}
            control   = {
                <Checkbox 
                    defaultChecked = {field?.defaultChecked}
                    checked        = {formData[field?.name]} 
                    onChange       = {(event) => setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))} 
                />
            } 
          />
        ),
        select: (field) => (
          <FormControl 
            key       = {field?.key || field.name} 
            className = {cx(styles.fieldStyles, fieldStyles)} 
            style     = {field?.style}
            fullWidth
          >
            <InputLabel id={field.name}>{field?.label}</InputLabel>
            <Select
              labelId  = {field?.labelId || field.name}
              id       = {field?.id || field.name}
              label    = {field?.label}
              { ...field }
              value    = {formData?.[field.name] || ''}
              onChange = {(event) => setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
            >
              {field?.options.map(([value, label]) => <MenuItem key={value} value={value}>{label}</MenuItem>)}
            </Select>
          </FormControl>
        )
      }

    return (
        <WrapperComponent className={cx(styles.formBlock, wrapperStyles)}>
          {fields?.map(({ typeField, ...field }) => fieldTypes[typeField || 'string'](field))}
        </WrapperComponent>
    )
}