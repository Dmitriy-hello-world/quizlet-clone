import './App.scss'
import React, { Suspense, lazy } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import SmartRoute from './components/base/SmartRoute'
import Layout from './components/pages/Layout'
import { store } from './store'

const LoginPage = lazy(async () => await import('./components/pages/Login'));
const ModulesPage = lazy(async () => await import('./components/pages/Modules'));

function App() {
  const routes = [
    {
      index: true,
      element: <LoginPage/>
    },
    {
      path: 'modules',
      element: <ModulesPage/>,
      private: true
    }
  ]

  return (
    <Provider store={store}>
      <BrowserRouter>
          <SmartRoute routes={routes} layout={<Layout/>} redirectTo="/" />
      </BrowserRouter>
    </Provider>
  )
}

export default App
