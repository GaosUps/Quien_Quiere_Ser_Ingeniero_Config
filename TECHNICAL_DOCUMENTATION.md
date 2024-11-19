# Documentación Técnica de la API de Configuración para "¿Quién Quiere Ser Ingeniero?"

## Descripción General

La API de configuración para "¿Quién Quiere Ser Ingeniero?" (QQI) está desarrollada en Python utilizando Flask. Esta API permite crear y gestionar configuraciones del juego, incluyendo parámetros como el número de jugadores, preguntas, materia y nivel de dificultad. La base de datos utilizada es SQL Server, y el frontend está construido en React para la interacción con el usuario.

### Arquitectura

- **Backend:** Python + Flask.
- **Base de Datos:** SQL Server.
- **Frontend:** React.

---

## Funciones Principales

### 1. **Inicialización de la Aplicación**
   - **Archivo:** `app.py`
   - **Descripción:** Configura y ejecuta la aplicación Flask, incluyendo la conexión a la base de datos y el registro de rutas.

```python
   from flask import Flask
   from database import connection
   from routes import routesqqi
   from flask_cors import CORS

   app = Flask(__name__)
   CORS(app)

   app.register_blueprint(routesqqi.routes)

   if __name__ == '__main__':
       connection.connect_db()
       app.run(host='0.0.0.0')
```

   **Funcionalidad:**
   - Inicializa el servidor Flask.
   - Conecta con la base de datos SQL Server al iniciar.
   - Habilita CORS para permitir solicitudes desde el frontend.

---

### 2. **Conexión a la Base de Datos**
   - **Archivo:** `database/connection.py`
   - **Función:** `connect_db()`
   - **Descripción:** Establece la conexión con la base de datos SQL Server utilizando `pyodbc`.

   ```python
   def connect_db():
       cnxn = pyodbc.connect(
           f'DRIVER={{ODBC Driver 17 for SQL Server}};'
           f'Server={host};'
           f'Database={database};'
           f'UID={user};'
           f'PWD={password};'
           'TrustServerCertificate=yes;'
           'Encrypt=no;'
       )
       return cnxn
   ```

   **Funcionalidad:**
   - Utiliza las credenciales del archivo `.env` para establecer la conexión.
   - Devuelve un objeto de conexión activo.

---

### 3. **Gestión de Configuración**
#### a) Creación de la Tabla
   - **Archivo:** `controller/configcontroller.py`
   - **Función:** `create_table()`
   - **Descripción:** Crea la tabla `config_qqi` si no existe en la base de datos.

   ```python
   def create_table():
       query = '''
           IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='config_qqi' AND xtype='U')
           CREATE TABLE config_qqi (
               Jugadores INT,
               NumeroPreguntas INT,
               Materia NVARCHAR(50),
               NivelPregunta INT
           );
       '''
       cursor.execute(query)
   ```

#### b) Inserción de Configuración
   - **Función:** `insert_config(jugadores, numero_preguntas, materia, nivel_pregunta)`
   - **Descripción:** Inserta una nueva configuración en la tabla `config_qqi`.

   ```python
   def insert_config(jugadores, numero_preguntas, materia, nivel_pregunta):
       query = '''
           INSERT INTO config_qqi (Jugadores, NumeroPreguntas, Materia, NivelPregunta)
           VALUES (?, ?, ?, ?);
       '''
       cursor.execute(query, (jugadores, numero_preguntas, materia, nivel_pregunta))
   ```

#### c) Eliminación de la Tabla
   - **Función:** `delete_table()`
   - **Descripción:** Elimina la tabla `config_qqi`.

   ```python
   def delete_table():
       query = 'DROP TABLE config_qqi;'
       cursor.execute(query)
   ```

---

### 4. **Definición de Rutas**
   - **Archivo:** `routes/routesqqi.py`
   - **Descripción:** Define los endpoints principales de la API.

#### a) Endpoint para Crear Configuración
   - **Ruta:** `POST /create`
   - **Descripción:** Crea una configuración de juego y la guarda en la base de datos.

   ```python
   @routes.route('/create', methods=['POST'])
   def config():
       data = request.get_json()
       configController.create_table()
       configController.insert_config(
           data['jugadores'], 
           data['numpreguntas'], 
           data['materia'], 
           data['nivel']
       )
       return jsonify({"message": "Configuración creada correctamente"}), 201
   ```

#### b) Endpoint para Eliminar la Tabla
   - **Ruta:** `DELETE /delete`
   - **Descripción:** Elimina la tabla `config_qqi` de la base de datos.

   ```python
   @routes.route('/delete', methods=['DELETE'])
   def delete_table():
       configController.delete_table()
       return jsonify({"message": "Tabla eliminada correctamente"}), 200
   ```

---

## Flujo General de la API

1. **Inicio del servidor:** El servidor Flask se ejecuta en el host `0.0.0.0` en el puerto 5000.
2. **Creación de configuración:** El cliente envía una solicitud `POST /create` con los datos necesarios.
3. **Inserción en la base de datos:** La configuración se guarda en la tabla `config_qqi`.
4. **Eliminación de la tabla:** El cliente puede eliminar toda la tabla enviando una solicitud `DELETE /delete`.

---

## Requisitos Previos

1. **Crear y Activar un Entorno Virtual:**
   ```bash
   python -m venv env
   env\Scripts\activate  # Windows
   source env/bin/activate  # MacOS/Linux
   ```

2. **Instalar Dependencias:**
   ```bash
   pip install flask flask-cors pyodbc python-dotenv
   ```

3. **Configurar el Archivo `.env`:**
   ```plaintext
   HOST=tu-host
   USER=tu-usuario
   PASSWORD=tu-contraseña
   DATABASE=tu-base-de-datos
   ```

---

## Futuras Mejoras

1. Validación de datos más estricta en los endpoints.
2. Implementación de autenticación para mayor seguridad.
3. Ampliación de la funcionalidad para actualizar configuraciones existentes.
4. Creación de pruebas unitarias automatizadas para garantizar la calidad del código.

--- 