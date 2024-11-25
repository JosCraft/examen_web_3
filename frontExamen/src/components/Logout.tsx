import { useNavigate } from 'react-router-dom'
import {Button} from './ui/button'

import { removeToken } from '../utilities'
import { PublicRoutes } from '../models'

const Logout = () => {
    const navigate = useNavigate();

    const logout = () => {
        removeToken();
        navigate(PublicRoutes.LOGIN);
    }

    return (
        <Button
            className="bg-red-500 text-white hover:bg-red-700 rounded shadow-sm ml-4"
            onClick={logout}
        >
            Cerrar Sesion
        </Button>
    )
}

export default Logout
