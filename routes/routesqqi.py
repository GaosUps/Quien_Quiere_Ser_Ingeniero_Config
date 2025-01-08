from flask import Blueprint, request, jsonify
from controller import configController
import pandas as pd
routes = Blueprint('routes', __name__)
@routes.route('/')
def hello_world(): 
    return 'Hello World!'

@routes.route('/create', methods=['POST'])
def config():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No se enviaron datos JSON"}), 400
        jugadores = data.get('jugadores')
        num_preguntas = data.get('numpreguntas')
        materia = data.get('materia')
        nivel = data.get('nivel')

        if not (jugadores and num_preguntas and materia and nivel):
            return jsonify({"error": "Faltan parámetros obligatorios"}), 400


        configController.create_table()
        configController.insert_config(jugadores, num_preguntas, materia, nivel)

        return jsonify({"message": "Configuración creada correctamente"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@routes.route('/delete', methods=['DELETE'])
def delete_table():
    try:
        configController.delete_table()
        return jsonify({"message": "Tabla eliminada correctamente"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@routes.route('/upload_questions', methods=['POST'])
def insert_questions():
    if request.method == 'POST':
        if 'archivo' not in request.files:
            return jsonify({'error': 'No se proporcionó ningún archivo'}), 400
        f = request.files['archivo']
        filename = f.filename
        # Validar extensión del archivo
        if not filename.endswith(('.xlsx', '.xls', '.xlsm')):
            return jsonify({'error': 'El archivo debe tener formato .xlsx, .xls o .xlsm'}), 400
        # Leer archivo Excel
        try:
            df = pd.read_excel(f, engine='openpyxl')  # Usa el motor adecuado
        except Exception as e:
            return jsonify({'error': f'Error al leer el archivo: {str(e)}'}), 400
        # Verificar que las columnas requeridas existan
        expected_columns = ['Question', 'option1', 'option2', 'option3', 'option4', 'answer', 'materia', 'dificultad']
        if not all(col in df.columns for col in expected_columns):
            return jsonify({'error': 'El archivo no tiene el formato esperado'}), 400
        # Reordenar las columnas para que coincidan con el orden esperado
        df = df[expected_columns]
        # Procesar datos
        configController.prueba(df)
        return jsonify({'message': 'Archivo procesado y preguntas insertadas exitosamente'}), 200