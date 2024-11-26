import { useState, useEffect } from "react";
import NavBarStyle from "./NavBarStyle";
import { Button } from "../../components/ui/button";
import { Menu, X } from "lucide-react";
import { FaHome, FaInfoCircle, FaStore } from 'react-icons/fa';
import { checkToken,getToken } from "../../utilities";
import Logout from "../../components/Logout";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
      setIsAuthenticated(checkToken());
      console.log('isAuthenticated:', checkToken());
      console.log('Token:', getToken());
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };



    return (
        <header className="bg-indigo-900 text-indigo-50 shadow-md">
            <NavBarStyle>
                <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <ul className="hidden md:flex space-x-6">
                        <li>
                            <a href="/" className="link hover:text-indigo-400 transition-colors duration-200">
                                <FaHome size={20} />
                                Inicio
                            </a>
                        </li>
                    </ul>

                    {isAuthenticated ? (
                        <Logout />
                    ) : (
                        <a href="login">
                          <Button
                            className="bg-indigo-500 text-white hover:bg-indigo-700 rounded shadow-sm"                            
                        >
                            Iniciar Sesion
                        </Button>
                        </a>
                    )}

                    <Button
                        className="bg-indigo-400 md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white rounded hover:bg-indigo-600"
                        onClick={toggleMenu}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </nav>

                {isOpen && (
                    <div className="bg-indigo-900 text-indigo-50 hover:text-indigo-400 md:hidden">
                        <ul className="flex flex-col space-y-2 px-4 py-2">
                            <li>
                                <a href="/" className="block py-2 px-4 link text-white hover:bg-indigo-400 rounded transition-colors duration-200">
                                    <FaHome size={20} /> Inicio
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </NavBarStyle>
        </header>
    );
};

export default Navbar;
