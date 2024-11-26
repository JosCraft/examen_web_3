import Mainlayout from '../../templates/mainLayout/Mainlayout';
import { useNavigate } from 'react-router-dom'
import { Label, Input, Button } from '../../components';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { PrivateRoutes } from '../../models';

import { saveToken } from '../../utilities';
import { apiService } from '../../services/apiServices';

const Login = () => {
  const navigate = useNavigate(); 
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const [error, setError] = useState(''); // Para manejar errores

  
interface FormData {
  email: string;
  password: string;
}

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

const handleInputChange = (e: InputChangeEvent) => {
  const { id, value } = e.target;
  setFormData((prevData: FormData) => ({
      ...prevData,
      [id]: value,
  }));
};

const submitLogin = async () => {
  if (!formData.email || !formData.password) {
    setError('Por favor ingrese todos los campos');
    return;
  }

  apiService.create('login', {
    correo: formData.email,
    contrasena: formData.password,
  })
    .then((data) => {
      const token = data.token || data; 
      setToken(token); 
      saveToken(token); 
      console.log('Token recibido:', token);
      console.log('Login correcto');
      navigate(`/${PrivateRoutes.BASE}/`);
    })
    .catch((error) => {
      console.error('Error en login:', error);
      setError('Credenciales incorrectas o error en el servidor');
    })
    .finally(() => setLoading(false));
  setLoading(true);
  setError('');
};

console.log('Token guardado', token, 'en localStorage');

  return (
    <Mainlayout>
      <div className="max-w-[600px] mx-auto mt-10 p-6 bg-indigo-50 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mt-8 text-indigo-700">Iniciar sesión</h1>

        <form className="space-y-6 mt-4" onSubmit={(e) => e.preventDefault()}>    
          <div className="flex flex-col">
            <Label htmlFor="email" className="text-lg font-medium text-gray-700">
              Correo Electrónico
            </Label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <FaEnvelope className="text-gray-500 ml-3 mr-3" />
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Correo Electrónico"
                className="flex-1 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="password" className="text-lg font-medium text-gray-700">
              Contraseña
            </Label>
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
              <FaLock className="text-gray-500 ml-3 mr-3" />
              <Input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Contraseña"
                className="flex-1 p-2 pl-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          {/* Error de login */}
          {error && <div className="text-red-500 text-center">{error}</div>}

          {/* Botón de login */}
          <Button
            type="button"
            onClick={submitLogin}
            className="bg-indigo-500 hover:bg-indigo-700 text-white p-3 rounded-lg shadow-sm flex items-center justify-center w-full transition-all ease-in duration-200"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Ingresar'}
          </Button>
        </form>
      </div>
    </Mainlayout>
  )
}

export default Login
 