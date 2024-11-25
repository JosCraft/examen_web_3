backend/
├── app/
│   ├── controllers/
│   │   ├── user_controller.py       # Controlador para usuarios
│   │   ├── product_controller.py    # Controlador para productos
│   │   └── __init__.py
│   ├── models/
│   │   ├── user_model.py            # Modelo para usuarios
│   │   ├── product_model.py         # Modelo para productos
│   │   └── __init__.py
│   
│   ├── views/
│   │   ├── user_view.py             # Rutas para usuarios
│   │   ├── product_view.py          # Rutas para productos
│   │   └── __init__.py
│   ├── services/
│   │   ├── user_service.py          # Lógica de negocio para usuarios
│   │   ├── product_service.py       # Lógica de negocio para productos
│   │   └── __init__.py
│   ├── core/
│   │   ├── config.py                # Configuración global (env, constantes)
│   │   ├── database.py              # Configuración de la base de datos
│   │   └── __init__.py
│   ├── main.py                      # Punto de entrada de la aplicación
│   └── __init__.py
├── requirements.txt                 # Dependencias del proyecto
└── README.md                        # Documentación
