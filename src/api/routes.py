"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from __future__ import print_function
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Actividades, Reservas, Comentarios
from api.utils import generate_sitemap, APIException
import datetime
from datetime import timedelta
import jwt
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token


api = Blueprint('api', __name__)
ACCESS_EXPIRES = timedelta(hours=1)


@api.route('/usuario/<int:usuario_id>', methods=['POST', 'GET'])
def handle_user(usuario_id):
    user = Users.get_by_id(usuario_id)
    the_user = Users.serialize(user)
    return jsonify(the_user), 200


@api.route('/desactiva_user/<int:usuario_id>', methods=['POST', 'GET'])
def handle_del(usuario_id):
    user = Users.desactiva_by_id(usuario_id)
    return jsonify(user), 200


@api.route('/modifica_user/<int:usuario_id>', methods=['POST', 'GET'])
def handle_mod(usuario_id):
    data = request.get_json()
    mod_user = Users.modifica_by_id(usuario_id, data)
    return jsonify(mod_user), 200


@api.route('/foto_user/<int:usuario_id>', methods=['POST', 'GET'])
def handle_foto(usuario_id):
    if request.method == 'POST':
        f = request.files['archivo']
        filename = secure_filename(f.filename)
        f.save(os.path.join("src/imgs/users", str(usuario_id)+"_"+filename))
        foto_user = Users.foto_by_id(usuario_id, "src/imgs/users/"+str(usuario_id)+"_"+filename)
        return jsonify(foto_user), 200
    else:
        return jsonify("No POST"), 400


@api.route('/new_user', methods=['POST'])
def handle_new():
    user = request.get_json()
    user_new = Users.new_user(user)
    return jsonify(user_new), 200


@api.route('/login', methods=['POST', 'GET'])
def login_user():
    data = request.get_json()
    SECRET = os.getenv('FLASK_APP_KEY')  # variable ENV
    if not data:
        return jsonify({"error": 'no_data'}), 401

    user = Users.query.filter_by(email=data['email']).first()
    if user:
        if check_password_hash(user.password, data['password']):
            token = jwt.encode({'id': user.id, 'exp': datetime.datetime.utcnow(
            ) + ACCESS_EXPIRES}, SECRET)
            access_token = create_access_token(token)
            return jsonify({"token": access_token}), 200
        return jsonify({"error": 'no_pass'}), 401
    return jsonify({"error": 'no_user'}), 401

@api.route('/new_pass', methods=['POST', 'GET'])
def handle_pass():
    data = request.get_json()
    if data["email"]:
        pass_user = Users.pass_by_mail(data["email"])
        return jsonify(pass_user), 200
    else:
        return jsonify("No email"), 400

# --------------------------------------- ACTIVIDADES---------------------


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
    return jsonify({"message": "Error al recuperar datos"}), 400


@api.route('/actividad_user/<int:user_id>', methods=['POST', 'GET'])
def handle_acti_user(user_id):
    act_user = Actividades.get_by_user(user_id)
    if act_user:
        all_act_user = [Actividades.serialize() for Actividades in act_user]
        return jsonify(all_act_user), 200
    return jsonify({"message": "Error al recuperar datos"}), 400

# -----------------------------------RESERVAS


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
    return jsonify({"message": "Error al recuperar datos"}), 400


@api.route('/reserva_user/<int:user_id>', methods=['POST', 'GET'])
def handle_reser_user(user_id):
    reser_user = Reservas.get_by_user(user_id)
    if reser_user:
        all_reser_user = [Reservas.serialize() for Reservas in reser_user]
        return jsonify(all_reser_user), 200
    return jsonify({"message": "Error al recuperar datos"}), 400
