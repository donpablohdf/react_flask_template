"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Actividades, Reservas, Comentarios
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/usuario/<int:usuario_id>', methods=['POST', 'GET'])
def handle_user(usuario_id):
    user = Users.get_by_id(usuario_id)
    the_user = Users.serialize(user) 
    return jsonify(the_user), 200

@api.route('/actividad/<int:actividad_id>', methods=['POST', 'GET'])
def handle_acti(actividad_id):
    acti = Actividades.get_by_id(actividad_id)
    the_acti = Actividades.serialize(acti) 
    return jsonify(the_acti), 200

@api.route('/actividad_guia/<int:guia_id>', methods=['POST', 'GET'])
def handle_acti_guia(guia_id):
    act_guia = Actividades.get_by_guia(guia_id)
    if act_guia:
        all_act_guia = [Actividades.serialize() for Actividades in act_guia]
        return jsonify(all_act_guia), 200
    return jsonify({"message":"Error al recuperar datos"}), 400

@api.route('/actividad_user/<int:user_id>', methods=['POST', 'GET'])
def handle_acti_user(user_id):
    act_user = Actividades.get_by_user(user_id)
    if act_user:
        all_act_user = [Actividades.serialize() for Actividades in act_user]
        return jsonify(all_act_user), 200
    return jsonify({"message":"Error al recuperar datos"}), 400

@api.route('/reserva/<int:reserva_id>', methods=['POST', 'GET'])
def handle_reser(reserva_id):
    reser = Reservas.get_by_id(reserva_id)
    the_reser = Reservas.serialize(reser) 
    return jsonify(the_reser), 200

@api.route('/reserva_guia/<int:guia_id>', methods=['POST', 'GET'])
def handle_reser_guia(guia_id):
    reser_guia = Reservas.get_by_guia(guia_id)
    if reser_guia:
        all_reser_guia = [Reservas.serialize() for Reservas in reser_guia]
        return jsonify(all_reser_guia), 200
    return jsonify({"message":"Error al recuperar datos"}), 400

@api.route('/reserva_user/<int:user_id>', methods=['POST', 'GET'])
def handle_reser_user(user_id):
    reser_user = Reservas.get_by_user(user_id)
    if reser_user:
        all_reser_user = [Reservas.serialize() for Reservas in reser_user]
        return jsonify(all_reser_user), 200
    return jsonify({"message":"Error al recuperar datos"}), 400