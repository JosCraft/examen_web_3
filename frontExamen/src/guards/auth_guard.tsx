import { jwtDecode } from "jwt-decode"; 
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../models";

export const AuthGuard = () => {


     const checkAuthentication = () => {
        const token = localStorage.getItem('authToken'); 
        if (token) {
            try {
                const decoded = jwtDecode(token); 
                const isExpired = decoded.exp ? decoded.exp * 1000 < Date.now() : true; // Verifica la expiración
                return (!isExpired);
            } catch (error) {
                console.error("Token inválido", error);
                return false;
            }
        } else {
            return false;
        }
    };

    return checkAuthentication() ? <Outlet/> : <Navigate replace to={PublicRoutes.LOGIN} />;
}

export default AuthGuard;