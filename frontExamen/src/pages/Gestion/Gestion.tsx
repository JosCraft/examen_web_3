import { lazy } from 'react'
import { Route, Navigate } from 'react-router-dom'
import { RoutesNotFound } from '../../utilities'
import { PrivateRoutes } from '../../models'

const Dashboard = lazy(() => import('./Dashboard/Dashboard'))

const Gestion = () => {
  return (
    <RoutesNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.DASHBOARD}/>}/>
        <Route path={PrivateRoutes.DASHBOARD} element={<Dashboard/>}/>
    </RoutesNotFound>
  )
}

export default Gestion
