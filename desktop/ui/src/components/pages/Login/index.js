import React from 'react'
import Modal from '../../shared/Modal'
import { useState } from 'react'
import { useCreateUserMutation } from '../../../services/users'
import { useCreateSessionMutation } from '../../../services/sessions'
import { useDispatch } from 'react-redux'
import { login } from '../../../features/sessions/sessionSlice'
import { TOKEN, LOGIN_TABS, SIGN_UP_TABS } from '../../../constants'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [ createUser, { isLoading: userLoading } ] = useCreateUserMutation();
  const [ createSession, { isLoading: sessionLoading } ] = useCreateSessionMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ tabs, setTabs ] = useState({
    'Login': LOGIN_TABS,
    'Sign up': SIGN_UP_TABS
  })

  const handleCreateSession = async (payload) => {
      const { status, data, error } = await createSession({ data: {
        email: payload?.email,
        password: payload?.password
      } }).unwrap();
  
      if (!status) throw error

      localStorage.setItem(TOKEN, data.jwt);
      dispatch(login());
      return navigate('/modules');
  }

  const actions = {
    'Login': handleCreateSession,
    'Sign up': async (payload) => {

      const { status, error } = await createUser(payload).unwrap();

      if (!status) throw error;

      return await handleCreateSession(payload)
    }
  }

  async function onSend(formData, action) {
    try {
      return await actions[action](formData);
    } catch(error) {
      const fields = {};

      for(const key of Object.keys(error.fields)) {
        fields[key.replace('data/', '')] = error.fields[key]
      }

      setTabs({
        ...tabs,
        [action]: tabs[action].map(field => {
          if (fields?.[field.name]) return {
            ...field,
            error: true,
            helperText: fields[field.name].replaceAll('_', ' ').toLowerCase()
          }

          return field;
        })
      })
    }
  }

  return <Modal onSend={onSend} isOpen tabs={tabs} defaultTab={'Login'} />
}
