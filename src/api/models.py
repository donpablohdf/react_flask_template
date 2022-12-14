from __future__ import print_function
import requests
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Sequence, DateTime, update
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
import secrets
import string


import base64
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

#from api.Google import Create_Service


db = SQLAlchemy()
class Users(db.Model):
    id = db.Column(db.Integer,Sequence('users_id_seq', start=1, increment=1), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=False, nullable=False)
    tipo = db.Column(db.Integer, unique=False, nullable=False) #por defecto 0 (usuario normal) 1 si es guía
    descripcion = db.Column(db.Text, unique=False, nullable=True) # se rellena si es guía
    nombre = db.Column(db.String(120), unique=False, nullable=True)
    apellidos = db.Column(db.String(120), unique=False, nullable=True)
    ciudad = db.Column(db.String(120), unique=False, nullable=True)
    foto = db.Column(db.String(120), unique=False, nullable=True)
    activo = db.Column(db.Integer, unique=False, nullable=True) # 0 inactivo 1 activo
    

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
    def get_by_id(self, pid):
        return self.query.filter_by(id=pid).first()

    @classmethod
    def pass_by_mail(self, usuario_email):
        #generar password
        letters = string.ascii_letters
        digits = string.digits
        alphabet = letters + digits 
        pwd_length = 8
        pwd = ''
        for i in range(pwd_length):
            pwd += ''.join(secrets.choice(alphabet))

        if pwd!='':
            user_email= self.query.filter_by(email=usuario_email).first()
            if not user_email:
                return "El email no es válido"
            user = self.query.get(user_email.id)
            new_password = generate_password_hash(pwd, method='SHA256')
            user.password=new_password
            db.session.commit()
            #enviar password      
            envio = requests.post("https://api.mailgun.net/v3/sandbox97a2f98c3e074c388e1d02fb35ed5ae4.mailgun.org/messages",
                auth=("api", "0cf0f0943e20bc8e07c6b454da84bb25-48d7d97c-6e9be95a"),
                data={"from": "OH MY TOWN <ohmytownapp@gmail.com>",
                "to": [usuario_email],
                "subject": "Nueva contraseña OH MY TOWN",
                "text": "Hola, tu nueva contraseña es "+pwd })
            if "200" in str(envio):
                return "Enviado password"
            else:
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
    def foto_by_id(self, pid,foto):
        user = self.query.get(pid)
        if user:
            user.foto = foto
            db.session.commit()
            return "Foto cambiada con exito"
        return False
        
    @classmethod
    def modifica_by_id(self, pid, data):
        if data:
            print(data)
            user = self.query.get(pid)
        if user:
            if data['password']:
                if check_password_hash(user.password, data['password']): 
                    hashed_password = generate_password_hash(str(data['password']), method='SHA256')
                    user.password=hashed_password   
            if user.email!=data["email"]: user.email=data["email"]
            if user.tipo!=data["tipo"]: user.tipo=data["tipo"]
            if user.descripcion!=data["descripcion"]: user.descripcion=data["descripcion"]
            if user.nombre!=data["nombre"]: user.nombre=data["nombre"]
            if user.apellidos!=data["apellidos"]: user.apellidos=data["apellidos"]
            if user.ciudad!=data["ciudad"]: user.ciudad=data["ciudad"]
            db.session.commit()
            return "Usuario modificado con exito"
        return False

    @classmethod
    def new_user(self, user): 
        comp_email= self.query.filter_by(email=user['email']).first()
        if comp_email:
            return 1   
        hashed_password = generate_password_hash(str(user['password']), method='SHA256')    
        new_user = Users(email=user['email'], password= hashed_password, tipo= 0, activo=1)
        db.session.add(new_user)
        db.session.commit()
        return "Usuario creado con éxito"
        
class Actividades(db.Model):
    id = db.Column(db.Integer, Sequence('actividades_id_seq', start=1, increment=1), primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    descripcion = db.Column(db.Text, unique=False, nullable=False)
    precio = db.Column(db.String(120), unique=False, nullable=False)
    fecha = db.Column(db.DateTime, unique=True, nullable=False)
    id_guia = db.Column(db.Integer, ForeignKey('users.id'), unique=False, nullable=False)
    ids_usuarios = db.Column(db.Text, unique=False, nullable=True) # array de ids de usuarios que han hecho la actividad
    ciudad = db.Column(db.String(120), unique=False, nullable=False)
    calificacion = db.Column(db.Integer, unique=False, nullable=True)
    foto = db.Column(db.String(120), unique=False, nullable=True)
    rels = relationship(Users)

    def __repr__(self):
        return f'<Actividades {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "fecha": self.fecha,
            "id_guia": self.id_guia,
            "ids_usuarios": self.ids_usuarios,
            "ciudad": self.ciudad,
            "calificacion": self.calificacion,
            "foto": self.foto,
            
        }
    @classmethod
    def get_by_id(self, pid):
        return self.query.filter_by(id=pid).first()

    @classmethod
    def get_by_guia(self, pid):
        return self.query.filter_by(id_guia=pid)

    @classmethod
    def get_by_user(self, pid):
        return self.query.filter(self.ids_usuarios.ilike(f'%{pid}%')).all()

class Reservas(db.Model):
    id = db.Column(db.Integer, Sequence('reservas_id_seq', start=1, increment=1), primary_key=True)
    num_reserva = db.Column(db.String(120), unique=True, nullable=False) #generado con uuid
    fecha_reserva = db.Column(db.DateTime, unique=True, nullable=False)
    fecha_realizacion = db.Column(db.DateTime, unique=True, nullable=True)
    id_actividad = db.Column(db.Integer, ForeignKey('actividades.id'), unique=False, nullable=False)
    id_usuario = db.Column(db.Integer, ForeignKey('users.id'), unique=False, nullable=False)
    id_guia = db.Column(db.Integer, unique=False, nullable=False)
    estado = db.Column(db.Integer, unique=False, nullable=False) #0 contratada 1 terminada 2 cancelada
    rels = relationship(Actividades)
    rel2 = relationship(Users)

    def __repr__(self):
        return f'<Reservas {self.num_reserva}>'

    def serialize(self):
        return {
            "id": self.id,
            "num_reserva": self.num_reserva,
            "fecha_reserva": self.fecha_reserva,
            "fecha_realizacion": self.fecha_realizacion,
            "id_actividad": self.id_actividad,
            "id_usuario": self.id_usuario,
            "id_guia": self.id_guia,
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
        
# una tabla de comentarios de actividad

class Comentarios(db.Model):
    id = db.Column(db.Integer, Sequence('comentarios_id_seq', start=1, increment=1), primary_key=True)
    id_actividad = db.Column(db.Integer, ForeignKey('actividades.id'), unique=False, nullable=False)
    id_usuario = db.Column(db.Integer, ForeignKey('users.id'), unique=False, nullable=False)
    texto = db.Column(db.Text, unique=True, nullable=False) 
    rels = relationship(Actividades)
    rel2= relationship(Users)

    def __repr__(self):
        return f'<Comentarios {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
        }
