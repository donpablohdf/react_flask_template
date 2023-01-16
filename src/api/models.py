import __future__
from mailjet_rest import Client
import requests
import os
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Sequence, DateTime, update, desc, func
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import string
from os import remove

from datetime import datetime, timedelta


# import base64
# from email.mime.multipart import MIMEMultipart
# from email.mime.text import MIMEText
# import smtplib


API_KEY = os.getenv("MAILJET_KEY")
SECRET_MAIL = os.getenv("MAILJET_SECRET")
mailjet = Client(auth=(API_KEY, SECRET_MAIL), version='v3.1')

db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, Sequence(
        'users_id_seq', start=1, increment=1), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    # por defecto 0 (usuario normal) 1 si es guía
    tipo = db.Column(db.Integer, unique=False, nullable=False)
    descripcion = db.Column(db.Text, unique=False,
                            nullable=True)  # se rellena si es guía
    nombre = db.Column(db.String(120), unique=False, nullable=True)
    apellidos = db.Column(db.String(120), unique=False, nullable=True)
    ciudad = db.Column(db.String(120), unique=False, nullable=True)
    foto = db.Column(db.String(120), unique=False, nullable=True)
    activo = db.Column(db.Integer, unique=False,
                       nullable=True)  # 0 inactivo 1 activo

    def __repr__(self):
        return f'<Users {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "tipo": self.tipo,
            "descripcion": self.descripcion,
            "nombre": self.nombre,
            "apellidos": self.apellidos,
            "ciudad": self.ciudad,
            "foto": self.foto,
            "activo": self.activo,

        }

    @classmethod
    def get_guias_index(self):
        return self.query.filter_by(tipo=1, activo=1).limit(6).all()

    @classmethod
    def get_by_id(self, pid):
        return self.query.filter_by(id=pid).first()

    @classmethod
    def get_by_mail(self, pid):
        return self.query.filter_by(email=pid).first()

    @classmethod
    def pass_by_mail(self, usuario_email):
        # generar password
        letters = string.ascii_letters
        digits = string.digits
        alphabet = letters + digits
        pwd_length = 8
        pwd = ''
        for i in range(pwd_length):
            pwd += ''.join(secrets.choice(alphabet))

        if pwd != '':
            user_email = self.query.filter_by(email=usuario_email).first()
            if not user_email:
                return "El email no es válido"
            user = self.query.get(user_email.id)
            new_password = generate_password_hash(pwd, method='SHA256')
            user.password = new_password
            db.session.commit()
            # enviar password
            #print(pwd)
            data = {
                'Messages': [
                    {
                        "From": {
                            "Email": "ohmytownapp@gmail.com",
                            "Name": "OH MY TOWN"
                        },
                        "To": [
                            {
                                "Email": usuario_email,
                                "Name": user.nombre
                            }
                        ],
                        "Subject": "Nueva contraseña OH MY TOWN",
                        "TextPart": "My first Mailjet email",
                        "HTMLPart": "<h3>Hola, Tu nueva contraseña es: "+pwd,
                        "CustomID": "AppGettingStartedTest"
                    }
                ]
            }
            result = mailjet.send.create(data=data)
            if "200" in str(result.status_code):
                return "Enviado password"
            else:
                #print(str(result.status_code))
                return "Password no enviado"

    @classmethod
    def desactiva_by_id(self, pid):
        user = self.query.get(pid)
        if user:
            user.activo = 0
            db.session.commit()
            return "Usuario desactivado con exito"
        return False

    @classmethod
    def foto_by_id(self, pid, foto):
        user = self.query.get(pid)
        if user:
            if os.path.isfile("public/"+user.foto):
                remove("public/"+user.foto)
            user.foto = foto
            db.session.commit()
            return "Foto cambiada con exito"
        return False

    @classmethod
    def modifica_by_id(self, pid, data):
        ismail=False
        if data:
            
            user = self.query.get(pid)
            ismail = self.query.filter_by(email=data['email']).first()
        if ismail:
            return {"error": "Email no valido"}
        if user and not ismail:
            if data['password']:
                if not check_password_hash(user.password, data['password']):
                    hashed_password = generate_password_hash(
                        str(data['password']), method='SHA256')
                    user.password = hashed_password
            if data['email'] and user.email != data["email"]:
                
                user.email = data["email"]
            else:
                user.email = user.email
            if data["tipo"] and user.tipo != data["tipo"]:
                user.tipo = data["tipo"]
            else:
                user.tipo = user.tipo
            if data["descripcion"] and user.descripcion != data["descripcion"]:
                user.descripcion = data["descripcion"]
            else:
                user.descripcion = user.descripcion
            if data["nombre"] and user.nombre != data["nombre"]:
                user.nombre = data["nombre"]
            else:
                user.nombre = user.nombre
            if data["apellidos"] and user.apellidos != data["apellidos"]:
                user.apellidos = data["apellidos"]
            else:
                user.apellidos = user.apellidos
            if data["ciudad"] and user.ciudad != data["ciudad"]:
                user.ciudad = data["ciudad"]
            else:
                user.ciudad = user.ciudad
            db.session.commit()
            return "Usuario modificado con exito"
        return "No se puede cambiar los datos", 401

    @classmethod
    def new_user(self, user):
        comp_email = self.query.filter_by(email=user['email']).first()
        if comp_email:
            return 1
        hashed_password = generate_password_hash(
            str(user['password']), method='SHA256')
        new_user = Users(email=user['email'],
                         password=hashed_password, tipo=0, activo=1)
        db.session.add(new_user)
        db.session.commit()
        return 2
# --------------------------------------------Actividades-------------------


class Actividades(db.Model):
    id = db.Column(db.Integer, Sequence('actividades_id_seq',
                   start=1, increment=1), primary_key=True)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    descripcion = db.Column(db.Text, unique=False, nullable=False)
    precio = db.Column(db.String(120), unique=False, nullable=False)
    fecha = db.Column(db.DateTime, unique=False, nullable=False)
    id_guia = db.Column(db.Integer, ForeignKey(
        'users.id'), unique=False, nullable=False)
    # array de ids de usuarios que han hecho la actividad
    ids_usuarios = db.Column(db.Text, unique=False, nullable=True)
    ciudad = db.Column(db.String(120), unique=False, nullable=False)
    calificacion = db.Column(db.Integer, unique=False, nullable=True)
    foto = db.Column(db.String(120), unique=False, nullable=True)
    activo = db.Column(db.Integer, unique=False,
                       nullable=True)  # 0 inactivo 1 activo
    rels = relationship(Users)

    def __repr__(self):
        return f'<Actividades {self.nombre}>'

    def serialize(self):
        guia= Users.get_by_id(self.id_guia)
        the_guia = Users.serialize(guia)
        comentarios= Comentarios.get_by_act(self.id)
        all_com = [Comentarios.serialize2() for Comentarios in comentarios]

        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "fecha": self.fecha,
            "id_guia": self.id_guia,
            "obj_guia": the_guia,
            "obj_com": all_com,
            "ids_usuarios": self.ids_usuarios,
            "ciudad": self.ciudad,
            "calificacion": self.calificacion,
            "activo": self.activo,
            "foto": self.foto,

        }

    @classmethod
    def get_by_id(self, pid):
        return self.query.filter_by(id=pid).first()

    @classmethod
    def get_by_guia(self, pid):

        return self.query.filter_by(id_guia=pid, activo=1).order_by(Actividades.fecha.desc())

    @classmethod
    def get_by_user(self, pid):
        return self.query.filter(self.ids_usuarios.ilike(f'%{pid}%')).all()

    @classmethod
    def act_index(self):
        return self.query.filter_by(activo=1).order_by(Actividades.calificacion.desc()).limit(6)

    @classmethod
    def new_act(self, guia, data):
        new_act_guia = Actividades(nombre=data['nombre'],
                                   descripcion=data['descripcion'],
                                   precio=data['precio'],
                                   fecha=data['fecha'],
                                   id_guia=data['id_guia'],
                                   ciudad=data['ciudad'],
                                   calificacion=0,
                                   ids_usuarios='',
                                   activo=1,
                                   foto=data['foto'])

        db.session.add(new_act_guia)
        db.session.commit()
        return "Actividad creada con éxito"

    @classmethod
    def foto_by_id(self, pid, foto):
        user = self.query.get(pid)
        if user:
            if os.path.isfile("public/"+user.foto):
                remove("public/"+user.foto)
            user.foto = foto
            db.session.commit()
            return "Foto cambiada con exito"
        return False

    @classmethod
    def modifica_by_id(self, pid, data):
        if data:
            # print(data)
            user = self.query.get(pid)
        if user:
            if user.ids_usuarios is None:
                if data["nombre"] and user.nombre != data["nombre"]:
                    user.nombre = data["nombre"]
                else:
                    user.nombre = user.nombre
                if data["descripcion"] and user.descripcion != data["descripcion"]:
                    user.descripcion = data["descripcion"]
                else:
                    user.descripcion = user.descripcion
                if data["precio"] and user.precio != data["precio"]:
                    user.precio = data["precio"]
                else:
                    user.precio = user.precio
                if data["fecha"] and user.fecha != data["fecha"]:
                    user.fecha = data["fecha"]
                else:
                    user.fecha =  user.fecha
                if data["ciudad"] and user.ciudad != data["ciudad"]:
                    user.ciudad = data["ciudad"]
                else:
                    user.ciudad = user.ciudad
            else:
                # si ya hay usuarios apuntados a la actividad
                if data["nombre"] and user.nombre != data["nombre"]:
                    user.nombre = data["nombre"]
                else:
                    user.nombre = user.nombre
                if data["descripcion"] and user.descripcion != data["descripcion"]:
                    user.descripcion = data["descripcion"]
                else:
                    user.descripcion = user.descripcion
            db.session.commit()
            return "Actividad modificada con exito"
        return False

    @classmethod
    def desactiva_by_id(self, pid):
        act = self.query.get(pid)
        if act:
            fecha_act = datetime.strptime(str(act.fecha), "%Y-%m-%d %H:%M:%S")
            hoy = datetime.now()
            if fecha_act > hoy:
                if act.ids_usuarios is not None and act.ids_usuarios!='':  # si la actividad está en fecha y existe algo en el campo ids_usuarios enviar mail y cancelar reservas
                    lista_ids_usuarios = act.ids_usuarios.split(sep=',')
                    #print(lista_ids_usuarios)
                    reserva = Reservas.query.filter_by(
                        id_actividad=pid, estado=0)
                    for i in reserva:  # cancelar reservas
                        i.estado = 2
                        db.session.commit()
                    for x in lista_ids_usuarios:  # enviar mail
                        #user = ''
                        #reserva_cancelada = ''
                        user = Users.query.get(x)
                        reserva_cancelada = Reservas.query.filter_by(
                            id_actividad=pid, id_usuario=x).first()
                        fecha_c = datetime.strptime(
                            str(reserva_cancelada.fecha_realizacion), "%Y-%m-%d %H:%M:%S")
                        fecha_str = datetime.strftime(
                            fecha_c, '%d-%m-%Y a las %H:%M')
                        txt_mail = "Hola, tu reserva "+reserva_cancelada.num_reserva + \
                            " con fecha "+fecha_str+" ha sido cancelada"
                        # print(txt_mail)
                        data = {
                            'Messages': [
                                {
                                    "From": {
                                        "Email": "ohmytownapp@gmail.com",
                                        "Name": "OH MY TOWN"
                                    },
                                    "To": [
                                        {
                                            "Email": user.email,
                                            "Name": user.nombre
                                        }
                                    ],
                                    "Subject": "Cancelación de reserva "+reserva_cancelada.num_reserva,
                                    "TextPart": "My first Mailjet email",
                                    "HTMLPart": txt_mail,
                                    "CustomID": "AppGettingStartedTest"
                                }
                            ]
                        }
                        result = mailjet.send.create(data=data)
                    act.activo = 0
                    db.session.commit()
                else:  # si no hay nada en el campo ids_usuarios
                    act.activo = 0
                    db.session.commit()
            else:  # si la fecha es anterior a la actual
                act.activo = 0
                db.session.commit()

            return "Actividad desactivada con exito"
        return "Actividad no encontrada"

    @classmethod
    def search(self):
        
        current_time = datetime.utcnow()
        return self.query.filter_by(activo=1).filter(Actividades.fecha>current_time)


class Reservas(db.Model):
    id = db.Column(db.Integer, Sequence('reservas_id_seq',
                   start=1, increment=1), primary_key=True)
    num_reserva = db.Column(db.String(120), unique=True,
                            nullable=False)  # generado con uuid
    fecha_reserva = db.Column(db.DateTime, unique=False, nullable=False)
    fecha_realizacion = db.Column(db.DateTime, unique=False, nullable=True)
    id_actividad = db.Column(db.Integer, ForeignKey(
        'actividades.id'), unique=False, nullable=False)
    id_usuario = db.Column(db.Integer, ForeignKey(
        'users.id'), unique=False, nullable=False)
    id_guia = db.Column(db.Integer, unique=False, nullable=False)
    # 0 contratada 1 terminada 2 cancelada
    estado = db.Column(db.Integer, unique=False, nullable=True)
    rels = relationship(Actividades)
    rel2 = relationship(Users)

    def __repr__(self):
        return f'<Reservas {self.num_reserva}>'

    def serialize(self):
        actividad= Actividades.get_by_id(self.id_actividad)
        the_act = Actividades.serialize(actividad)
        usuario= Users.get_by_id(self.id_usuario)
        the_usr = Users.serialize(usuario)
        guia= Users.get_by_id(self.id_guia)
        the_guia = Users.serialize(guia)
        return {
            "id": self.id,
            "num_reserva": self.num_reserva,
            "fecha_reserva": self.fecha_reserva,
            "fecha_realizacion": self.fecha_realizacion,
            "id_actividad": self.id_actividad,
            "obj_actividad": the_act ,
            "id_usuario": self.id_usuario,
            "obj_usuario": the_usr ,
            "id_guia": self.id_guia,
            "obj_guia": the_guia ,
            "estado": self.estado,

        }

    @classmethod
    def get_by_id(self, pid):
        return self.query.filter_by(id=pid).first()

    @classmethod
    def get_by_guia(self, pid):
        return self.query.filter_by(id_guia=pid)

    @classmethod
    def get_by_user(self, pid):
        return self.query.filter_by(id_usuario=pid)

    @classmethod
    def res_estado(self, est):
        return self.query.filter_by(estado=est)

    @classmethod
    def desactiva_by_id(self, pid):
        res = self.query.get(pid)
        if res:
            #print(str(res.fecha_realizacion))
            fecha_res = datetime.strptime(
                str(res.fecha_realizacion), "%Y-%m-%d %H:%M:%S")
            fecha_str = datetime.strftime(fecha_res, '%d-%m-%Y a las %H:%M')
            #fecha_str=res.fecha_realizacion
            guia = Users.query.get(res.id_guia)
            usuario = Users.query.get(res.id_usuario)
            actividad = Actividades.query.get(res.id_actividad)
            lista_ids_usuarios = actividad.ids_usuarios.split(sep=',')
            # print(lista_ids_usuarios)
            lista_ids_usuarios.remove(str(res.id_usuario))
            if len(lista_ids_usuarios) <= 1:
                actividad.ids_usuarios = "".join(map(str, lista_ids_usuarios))
            else:
                actividad.ids_usuarios = ",".join(map(str, lista_ids_usuarios))
            db.session.commit()
            txt_mail = "Hola, la reserva "+res.num_reserva+" de la actividad "+actividad.nombre + \
                " con fecha "+fecha_str+" ha sido cancelada por el usuario " + usuario.nombre
            # print(txt_mail)
            data = {
                'Messages': [
                    {
                        "From": {
                            "Email": "ohmytownapp@gmail.com",
                            "Name": "OH MY TOWN"
                        },
                        "To": [
                            {
                                "Email": guia.email,
                                "Name": guia.nombre
                            }
                        ],
                        "Subject": "Cancelación de reserva "+res.num_reserva,
                        "TextPart": "My first Mailjet email",
                        "HTMLPart": txt_mail,
                        "CustomID": "AppGettingStartedTest"
                    }
                ]
            }
            result = mailjet.send.create(data=data)
            res.estado = 2
            db.session.commit()
            return "Reserva cancelada con exito"
        return "Reserva no encontrada"

    @classmethod
    def res_nueva(self, datos):
        letters = string.ascii_letters
        digits = string.digits
        alphabet = letters + digits
        pwd_length = 6
        pwd = ''
        for i in range(pwd_length):
            pwd += ''.join(secrets.choice(alphabet))
        num_reserva_g = str(datos["id_usuario"])+"_"+str(datos["id_guia"]
                                                         )+"_"+str(datos["id_actividad"])+"_"+str(pwd)
        actividad = Actividades.query.get(datos['id_actividad'])
        if actividad.ids_usuarios == '':
            actividad.ids_usuarios = str(datos['id_usuario'])
        else:
            actividad.ids_usuarios = actividad.ids_usuarios + \
                ","+str(datos['id_usuario'])
        db.session.commit()
        usuario = Users.query.get(datos['id_usuario'])
        guia = Users.query.get(datos['id_guia'])
        now = datetime.now()
        fecha_res = now.strftime("%Y/%m/%d %H:%M:%S")
        new_res = Reservas(
            num_reserva=num_reserva_g,
            fecha_reserva=fecha_res,
            id_actividad=datos['id_actividad'],
            estado=0,
            fecha_realizacion=actividad.fecha,
            id_usuario=datos['id_usuario'],
            id_guia=datos['id_guia']
        )

        db.session.add(new_res)
        db.session.commit()
        if guia:
            txt_mail = "Hola, El usuario "+usuario.nombre+" ha hecho una reserva de la actividad " + \
                actividad.nombre+" con número de reserva " + num_reserva_g
            # print(txt_mail)
            data = {
                'Messages': [
                    {
                        "From": {
                            "Email": "ohmytownapp@gmail.com",
                            "Name": "OH MY TOWN"
                        },
                        "To": [
                            {
                                "Email": guia.email,
                                "Name": guia.nombre
                            }
                        ],
                        "Subject": "Nueva reserva de la actividad "+actividad.nombre,
                        "TextPart": "My first Mailjet email",
                        "HTMLPart": txt_mail,
                        "CustomID": "AppGettingStartedTest"
                    }
                ]
            }
            result = mailjet.send.create(data=data)
            return "Reserva creada con exito"
        return "Guia no encontrado"
# una tabla de comentarios de actividad


class Comentarios(db.Model):
    id = db.Column(db.Integer, Sequence('comentarios_id_seq',
                   start=1, increment=1), primary_key=True)
    id_actividad = db.Column(db.Integer, ForeignKey(
        'actividades.id'), unique=False, nullable=False)
    id_usuario = db.Column(db.Integer, ForeignKey(
        'users.id'), unique=False, nullable=False)
    texto = db.Column(db.Text, unique=True, nullable=False)
    activo = db.Column(db.Integer, unique=False,
                       nullable=True)  # 0 inactivo 1 activo
    rels = relationship(Actividades)
    rel2 = relationship(Users)

    def __repr__(self):
        return f'<Comentarios {self.nombre}>'

    def serialize(self):
        actividad= Actividades.get_by_id(self.id_actividad)
        the_act = Actividades.serialize(actividad)
        usuario= Users.get_by_id(self.id_usuario)
        the_usr = Users.serialize(usuario)
        return {
            "id": self.id,
            "id_actividad": self.id_actividad,
            "obj_actividad": the_act,
            "id_usuario": self.id_usuario,
            "obj_usuario": the_usr,
            "texto": self.texto,
            "activo": self.activo

        }
    def serialize2(self):
        
        return {
            "id": self.id,
            "id_actividad": self.id_actividad,
            "id_usuario": self.id_usuario,
            "texto": self.texto,
            "activo": self.activo

        }
    @classmethod
    def get_by_id(self, pid):
        return self.query.filter_by(id=pid).first()

    @classmethod
    def get_by_act(self, pid):
        return self.query.filter_by(id_actividad=pid, activo=1)

    @classmethod
    def get_by_usr(self, pid):
        return self.query.filter_by(id_usuario=pid)

    @classmethod
    def com_nuevo(self, id_act, id_usr, data):
        new_comn_act = Comentarios(
            id_actividad=id_act,
            id_usuario=id_usr,
            texto=data['texto'],
            activo=1
        )
        db.session.add(new_comn_act)
        db.session.commit()
        return "Comentario creado con éxito"

    @classmethod
    def desactiva_by_id(self, pid):
        com = self.query.get(pid)
        if com:
            com.activo = 0
            db.session.commit()
            return "Comentario desactivado con exito"
        return False
