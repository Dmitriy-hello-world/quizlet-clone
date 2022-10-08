import React, { Suspense } from 'react'
import { Route, Navigate, Routes, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

export default function SmartRoute(props) {
  const { routes, layout, redirectTo } = props
  const location = useLocation();
  const isAuthorized = useSelector((state) => state.sessions.userAuthorized)

  const privateRoutes = routes.filter(route => route?.private).map(({ path }) => path);

  if (!isAuthorized && privateRoutes.includes(location.pathname)) return <Navigate to={redirectTo} />

  return(
    <Routes>
      <Route path='/' element={layout}>
        {routes.map(({ element, ...rest }, i) => <Route key={i} {...rest} element={
          <Suspense fallback={<h2>Loading...</h2>}>{element}</Suspense>
        } />)}
      </Route>
    </Routes>
  )
}

SmartRoute.propTypes = {
  checkSession: PropTypes.bool,
}

SmartRoute.defaultProps = {
  checkSession: void 0,
}
