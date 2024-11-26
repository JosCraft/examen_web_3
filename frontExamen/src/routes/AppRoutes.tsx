import React,{ Suspense, lazy } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { RoutesNotFound } from '../utilities'
import { PrivateRoutes, PublicRoutes } from '../models'
import AuthGuard from '../guards/auth_guard'

import { Create } from '../pages/Create'
const Login = lazy(() => import('../pages/Login/Login'))
const App = lazy(() => import('../pages/App/App'))
const Gestion = lazy(() => import('../pages/Gestion/Gestion'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<>Cargando</>}>
        <BrowserRouter>
            <RoutesNotFound>
                <Route path={PublicRoutes.MAIN} element={<Login/>} />
                <Route path={PublicRoutes.LOGIN} element={<Login/>}></Route>
                <Route path='/create' element={<Create/>}></Route>
                <Route element={<AuthGuard />}>
                  <Route path={`${PrivateRoutes.BASE}/*`} element={<Gestion/>}></Route>
                </Route>
            </RoutesNotFound>
        </BrowserRouter>
    </Suspense>
  )
}

export default AppRoutes
