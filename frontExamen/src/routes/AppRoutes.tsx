import React,{ Suspense, lazy } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { RoutesNotFound } from '../utilities'
import { PrivateRoutes, PublicRoutes } from '../models'
import AuthGuard from '../guards/auth_guard'


const Login = lazy(() => import('../pages/Login/Login'))
const App = lazy(() => import('../pages/App/App'))
const Gestion = lazy(() => import('../pages/Gestion/Gestion'))

const AppRoutes = () => {
  return (
    <Suspense fallback={<>Cargando</>}>
        <BrowserRouter>
            <RoutesNotFound>
                <Route path={PublicRoutes.MAIN} element={<App/>} />
                <Route path={PublicRoutes.LOGIN} element={<Login/>}></Route>
                <Route path={`${PrivateRoutes.BASE}/*`} element={<Gestion/>}></Route>
                <Route element={<AuthGuard />}>
                    {/*routeas privadas*/}
                </Route>
            </RoutesNotFound>
        </BrowserRouter>
    </Suspense>
  )
}

export default AppRoutes
