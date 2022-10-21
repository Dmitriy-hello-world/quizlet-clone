import React, { Suspense, useEffect } from 'react'
import { Route, Navigate, Routes, useLocation, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { TOKEN } from '../../constants'
import { useGetProfileQuery } from '../../services/users'
import { logout } from '../../features/sessions/sessionSlice'
import { useSelector, useDispatch } from 'react-redux'

export default function SmartRoute(props) {
  const { routes, layout, rootPath, loginRoute, mainRoute } = props
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthorized = useSelector((state) => state.sessions.userAuthorized)
  const { data, isError, refetch } = useGetProfileQuery();

  useEffect(() => {
    refetch()
  }, [ location.pathname ])

  useEffect(() => {
    if (isAuthorized && (data?.error?.code === 'WRONG_TOKEN' || isError)) {
      localStorage.removeItem(TOKEN)
      dispatch(logout())
      navigate(loginRoute)
    }
  }, [ data ])
  
  const privateRoutes = routes.filter(route => route?.private).map(({ path }) => `${rootPath}${path}`);

  if (isAuthorized && location.pathname === loginRoute) return <Navigate to={mainRoute} />

  if (!isAuthorized && privateRoutes.includes(location.pathname)) return <Navigate to={loginRoute} />

  return(
    <Routes>
      <Route path={rootPath} element={layout}>
        {routes.map(({ element, ...rest }, i) => <Route key={i} {...rest} element={
          <Suspense fallback={<h2>Loading...</h2>}>{element}</Suspense>
        } />)}
      </Route>
    </Routes>
  )
}

SmartRoute.propTypes = {
  routes     : PropTypes.array.isRequired,
  rootPath   : PropTypes.string.isRequired,
  loginRoute : PropTypes.string.isRequired,
  mainRoute  : PropTypes.string.isRequired,
  layout     : PropTypes.element
}

SmartRoute.defaultProps = {
  layout : <></>
}
