from flask import Blueprint, request, jsonify
from controller import configController
routes = Blueprint('routes', __name__)
@routes.route('/')
def hello_world():  # put application's code here
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