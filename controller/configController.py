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



def insert_questions_batch(dataframe, batch_size=100):
    query = '''
        INSERT INTO preguntas (question, option1, option2, option3, option4, answer, materia, dificultad)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    '''
    try:
        with connection.connect_db as conn:
            cursor = conn.cursor()
            for i in range(0, len(dataframe), batch_size):
                batch = dataframe.iloc[i:i + batch_size]
                batch_data = [
                    (
                        row['Question'], row['option1'], row['option2'], row['option3'],
                        row['option4'], row['answer'], row['materia'], row['dificultad']
                    )
                    for _, row in batch.iterrows()
                ]
                cursor.executemany(query, batch_data)
            conn.commit()
            print(f"Se insertaron {len(dataframe)} registros en la base de datos.")
    except Exception as e:
        print(f"Error al insertar las preguntas: {e}")

def prueba(dataframe,batch_size=50):
    for i in range(0, len(dataframe), batch_size):
        batch = dataframe.iloc[i:i + batch_size]
        batch_data = [
            (
                row['Question'], row['option1'], row['option2'], row['option3'],
                row['option4'], row['answer'], row['materia'], row['dificultad']
            )
            for _, row in batch.iterrows()

        ]
        print(batch_data)