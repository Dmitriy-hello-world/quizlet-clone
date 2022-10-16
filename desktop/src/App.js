import './App.scss'
import React, { Suspense, lazy } from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import SmartRoute from './components/base/SmartRoute'
import Layout from './components/pages/Layout'
import { store } from './store'

const LoginPage = lazy(async () => await import('./components/pages/Login'));
const ModulesPage = lazy(async () => await import('./components/pages/Modules'));
const ModulePage = lazy(async () => await import('./components/pages/Module'));
const CardsGame = lazy(async () => await import('./components/pages/Cards'));

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
    },
    {
      path: 'module/:id',
      element: <ModulePage/>,
      private: true
    },
    {
      path: 'cards/:id',
      element: <CardsGame/>,
      private: true
    }
  ]

  return (
    <Provider store={store}>
      <HashRouter>
          <SmartRoute routes={routes} layout={<Layout/>} loginRoute="/" mainRoute="/modules" />
      </HashRouter>
    </Provider>
  )
}

export default App
