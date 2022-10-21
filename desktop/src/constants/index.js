export const TOKEN   = 'TOKEN'
export const PER_PAGE = 20
export const API_URL = process.env.API_URL || 'http://hisokacards.online/api/v1/'
export const CREATE_MODULE_TABS = [
    {
        label: 'Name',
        name: 'name',
    },
    {
        label: 'Description',
        name: 'description',
    },
    {
        label: 'Private',
        name: 'private',
        type: 'boolean',
        defaultChecked: true
    },
    {
        label: 'Edited by outsiders',
        name: 'editedByOutsiders',
        type: 'boolean'
    }
]

export const LOGIN_TABS = [
    {
      label: 'Email',
      name: 'email',
    },
    {
      label: 'Password',
      name: 'password',
    },
]

export const SIGN_UP_TABS = [
    {
      label: 'Name',
      name: 'firstName',
    },
    {
      label: "Second name",
      name: "secondName"
    },
    {
      label: 'Email',
      name: 'email',
    },
    {
      label: 'Password',
      name: 'password',
    },
    {
      label: 'Confirm password',
      name: 'confirmPassword'
    }
]

export const WORD_UPDATE_TABS = [
    {
      label: 'Image',
      name: 'image',
      type: 'image'
    },
    {
      label: 'Key',
      name: 'term'
    },
    {
      label: 'Value',
      name: 'definition'
    }
]