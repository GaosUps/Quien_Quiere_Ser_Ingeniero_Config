# API de Configuración para "¿Quién Quiere Ser Ingeniero?"

Este proyecto es una API desarrollada con Flask que permite gestionar la configuración del juego "¿Quién Quiere Ser Ingeniero?" (QQI). La base de datos utiliza SQL Server, y el frontend se desarrolló con React para una experiencia de usuario moderna e interactiva.

Para más detalles técnicos, revisa la [Documentación Técnica](TECHNICAL_DOCUMENTATION.md).

## Autores
- Francisco López
- Juan Donoso
- Mateo Montenegro
- Hugo

## Estructura del Proyecto

```plaintext
qqi_config
│   ├── controller/
│   │   ├── configcontroller.py  # Lógica para gestionar la configuración y tablas en la base de datos
│   └── db/
│   |    ├── connection.py        # Configuración de conexión a la base de datos SQL Server
|   ├── routes/
│       ├── routesqqi.py             # Rutas de la API
└── app.py                       # Configuración e inicialización de la aplicación Flask
```

## Descripción de la API

La API maneja lo siguiente:
- Creación de una tabla de configuración para el juego.
- Inserción de datos de configuración: número de jugadores, preguntas, materia, nivel.
- Eliminación de la tabla de configuración.

### Dependencias

Este proyecto requiere las siguientes dependencias de Python:

```bash
pip install flask flask-cors pyodbc python-dotenv
```

### Lista de Paquetes Instalados:

```plaintext
Package         Version
--------------- -------
blinker         1.8.2
click           8.1.7
colorama        0.4.6
Flask           3.0.3
Flask-Cors      3.0.10
itsdangerous    2.2.0
Jinja2          3.1.4
MarkupSafe      3.0.1
pip             24.2
pyodbc          4.0.39
python-dotenv   1.0.0
Werkzeug        3.0.4
```

---