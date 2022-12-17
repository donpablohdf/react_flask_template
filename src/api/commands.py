
import click
import os
from api.models import db, Users, Actividades, Reservas, Comentarios
from werkzeug.security import generate_password_hash

from datetime import datetime, timedelta
import uuid

import secrets
import string

from mailjet_rest import Client


def setup_commands(app):
    ahora = datetime.now()
    """ 
    This is an example command "insert-test-data" that you can run from the command line
    by typing: $ flask insert-test-data 
    """
    @app.cli.command("insert-test-data") # name of our command
    def insert_test_data():
        print("Creating test users")
        user = Users()
        user.email = "ohmytownapp@gmail.com"
        user.password = generate_password_hash("12345", method='SHA256')
        user.tipo = 0 #usuario NORMAL
        user.descripcion= "Texto descripción"
        user.nombre="Usuario normal"
        user.apellidos="Apellidos normal"
        user.ciudad="Localidad usuario"
        user.foto="imgs/users/foto_user.jpg"
        user.activo=1
        db.session.add(user)
        db.session.commit()
        user=''
        user = Users()
        user.email = "pabloalegrejuan@gmail.com"
        user.password = generate_password_hash("12345", method='SHA256')
        user.tipo = 1 #usuario GUIA
        user.descripcion= "Texto descripción guia"
        user.nombre="Usuario Guia"
        user.apellidos="Apellidos Guia"
        user.ciudad="Localidad Guia"
        user.foto="imgs/users/foto_guia.jpg"
        user.activo=1
        db.session.add(user)
        db.session.commit()
        print("All test user created")
        print("Creating test actividades")

        usuario_normal = Users.query.filter_by(tipo=0).first()
        usuario_guia = Users.query.filter_by(tipo=1).first()
        for i in range(8):
            new_act_guia = Actividades(
                nombre="Nombre actividad "+str(i),
                descripcion="descripcion actividad "+str(i), 
                precio="precio actividad "+str(i), 
                fecha=ahora + timedelta(days=i), 
                id_guia=usuario_guia.id, 
                ciudad="ciudad "+str(i),
                calificacion=10+i, 
                ids_usuarios='',
                activo=1,
                foto="imgs/actividades/actividad.jpg")

            db.session.add(new_act_guia)
            db.session.commit()
        print("All test actividades created")
        print("Creating test reservas")
        
        letters = string.ascii_letters
        digits = string.digits
        alphabet = letters + digits 
        pwd_length = 6
        pwd = ''
        for i in range(pwd_length):
            pwd += ''.join(secrets.choice(alphabet))
        actividad= Actividades.query.filter_by(calificacion=13).first()
        num_reserva_g = str(usuario_normal.id)+"_"+str(usuario_guia.id)+"_"+str(actividad.id)+"_"+str(pwd)
        
        actividad.ids_usuarios = actividad.ids_usuarios +","+str(usuario_normal.id)
        db.session.commit()
        new_res = Reservas(
            num_reserva=num_reserva_g,
            fecha_reserva=ahora, 
            id_actividad=actividad.id, 
            estado=0, 
            fecha_realizacion=actividad.fecha, 
            id_usuario=usuario_normal.id, 
            id_guia=usuario_guia.id
        )

        db.session.add(new_res)
        db.session.commit()
        print("All test reservas created")
        print("Creating test comentarios")
        for c in range(5):
            new_comn_act = Comentarios(
                id_actividad=actividad.id,
                id_usuario=usuario_normal.id, 
                texto="texto comentario"+ str(c),
                activo=1
            )
            db.session.add(new_comn_act)
            db.session.commit()
        print("All test actividades created")
        print("Test mail conf")
        if os.getenv("MAILJET_KEY") =='': print("MAILJET_KEY no configure in .env")
        if os.getenv("MAILJET_SECRET") =='': print("MAILJET_SECRET no configure in .env")
