from database import connection
def create_table():
    query = '''
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='config_qqi' AND xtype='U')
    BEGIN
        CREATE TABLE config_qqi (
            Jugadores INT,
            NumeroPreguntas INT,
            Materia NVARCHAR(50),
            NivelPregunta INT
        );
    END
    '''
    try:
        with connection.connect_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query)
            conn.commit()
    except Exception as e:
        print(f"Error al crear la tabla: {e}")
        raise


def delete_table():
    query = 'DROP TABLE config_qqi;'
    try:
        with connection.connect_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query)
            conn.commit()
    except Exception as e:
        print(f"Error al eliminar la tabla: {e}")
        raise

def insert_config(jugadores, numero_preguntas, materia, nivel_pregunta):
    query = '''
        INSERT INTO config_qqi (Jugadores, NumeroPreguntas, Materia, NivelPregunta) 
        VALUES (?, ?, ?, ?);
        '''
    try:
        with connection.connect_db() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (jugadores, numero_preguntas, materia, nivel_pregunta))
            conn.commit()
    except Exception as e:
        print(f"Error al insertar la configuración: {e}")
        raise