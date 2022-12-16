import __future__
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


#import base64
#from email.mime.multipart import MIMEMultipart
#from email.mime.text import MIMEText
#import smtplib


API_KEY = os.getenv("MAIL_KEY")
DOM_MAIL = "https://api.mailgun.net/v3/"+os.getenv("MAIL_DOM")+"/messages"
EMAILPP= "mailgun@"+os.getenv("MAIL_DOM")

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
            envio = requests.post(
                DOM_MAIL,
                auth=("api", API_KEY),
                data={"from": "OH MY TOWN <"+EMAILPP+">",
                "to": [usuario_email],
                "subject": "Nueva contraseña OH MY TOWN",
                "text": "Hola, tu nueva contraseña es "+pwd })
            if "200" in str(envio):
                return "Enviado password"
            else:
                print(str(envio))
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
            remove(user.foto)
            user.foto = foto
            db.session.commit()
            return "Foto cambiada con exito"
        return False
        
    @classmethod
    def modifica_by_id(self, pid, data):
        if data:
            #print(data)
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
# --------------------------------------------Actividades-------------------        
class Actividades(db.Model):
    id = db.Column(db.Integer, Sequence('actividades_id_seq', start=1, increment=1), primary_key=True)
    nombre = db.Column(db.String(120), unique=False, nullable=False)
    descripcion = db.Column(db.Text, unique=False, nullable=False)
    precio = db.Column(db.String(120), unique=False, nullable=False)
    fecha = db.Column(db.DateTime, unique=False, nullable=False)
    id_guia = db.Column(db.Integer, ForeignKey('users.id'), unique=False, nullable=False)
    ids_usuarios = db.Column(db.Text, unique=False, nullable=True) # array de ids de usuarios que han hecho la actividad
    ciudad = db.Column(db.String(120), unique=False, nullable=False)
    calificacion = db.Column(db.Integer, unique=False, nullable=True)
    foto = db.Column(db.String(120), unique=False, nullable=True)
    activo = db.Column(db.Integer, unique=False, nullable=True) # 0 inactivo 1 activo
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
            "activo": self.activo,
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

    @classmethod
    def act_index(self):
        return self.query.order_by(Actividades.calificacion.desc()).limit(6)

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
    def foto_by_id(self, pid,foto):
        user = self.query.get(pid)
        if user:
            remove(user.foto)
            user.foto = foto
            db.session.commit()
            return "Foto cambiada con exito"
        return False
        
    @classmethod
    def modifica_by_id(self, pid, data):
        if data:
            #print(data)
            user = self.query.get(pid)
        if user:     
            if user.ids_usuarios is None:         
                if user.nombre!=data["nombre"]: user.nombre=data["nombre"]
                if user.descripcion!=data["descripcion"]: user.descripcion=data["descripcion"]
                if user.precio!=data["precio"]: user.precio=data["precio"]
                if user.fecha!=data["fecha"]: user.fecha=data["fecha"]
                if user.ciudad!=data["ciudad"]: user.ciudad=data["ciudad"]
            else:
                #si ya hay usuarios apuntados a la actividad
                if user.nombre!=data["nombre"]: user.nombre=data["nombre"]
                if user.descripcion!=data["descripcion"]: user.descripcion=data["descripcion"]
            db.session.commit()
            return "Actividad modificada con exito"
        return False
    @classmethod
    def desactiva_by_id(self, pid):
        act = self.query.get(pid)
        if act:
            fecha_act = datetime.strptime(str(act.fecha), "%Y-%m-%d %H:%M:%S")
            hoy= datetime.now()
            if fecha_act > hoy:
                if act.ids_usuarios is not None: #si la actividad está en fecha y existe algo en el campo ids_usuarios enviar mail y cancelar reservas
                    lista_ids_usuarios = act.ids_usuarios.split(sep=',')
                    reserva = Reservas.query.filter_by(id_actividad=pid, estado=0)
                    for i in reserva: #cancelar reservas
                        i.estado=2
                        db.session.commit()
                    for x in lista_ids_usuarios: #enviar mail
                        user = ''
                        reserva_cancelada =''
                        user = Users.query.get(x)
                        reserva_cancelada = Reservas.query.filter_by(id_actividad=pid, id_usuario=x).first()
                        fecha_c = datetime.strptime(str(reserva_cancelada.fecha_realizacion), "%Y-%m-%d %H:%M:%S")
                        fecha_str= datetime.strftime(fecha_c,'%d-%m-%Y a las %H:%M')
                        txt_mail= "Hola, tu reserva "+reserva_cancelada.num_reserva+" con fecha "+fecha_str+" ha sido cancelada"
                        #print(txt_mail)
                        envio = requests.post(
                                DOM_MAIL,
                                auth=("api", API_KEY),
                                data={"from": "OH MY TOWN <"+EMAILPP+">",
                                "to": [user.email],
                                "subject": "Cancelación de reserva "+reserva_cancelada.num_reserva,
                                "text": txt_mail })
                        print(str(envio))

                    act.activo = 0 
                    db.session.commit()
                else: #si no hay nada en el campo ids_usuarios
                    act.activo=0
                    db.session.commit()
            else: #si la fecha es anterior a la actual
                act.activo=0
                db.session.commit()

            return "Actividad desactivada con exito"
        return "Actividad no encontrada"

    @classmethod
    def search(self):
        return self.query.filter_by(activo=1)

        #self.query.order_by(Actividades.calificacion.desc()).limit(6)

class Reservas(db.Model):
    id = db.Column(db.Integer, Sequence('reservas_id_seq', start=1, increment=1), primary_key=True)
    num_reserva = db.Column(db.String(120), unique=True, nullable=False) #generado con uuid
    fecha_reserva = db.Column(db.DateTime, unique=False, nullable=False)
    fecha_realizacion = db.Column(db.DateTime, unique=False, nullable=True)
    id_actividad = db.Column(db.Integer, ForeignKey('actividades.id'), unique=False, nullable=False)
    id_usuario = db.Column(db.Integer, ForeignKey('users.id'), unique=False, nullable=False)
    id_guia = db.Column(db.Integer, unique=False, nullable=False)
    estado = db.Column(db.Integer, unique=False, nullable=True) #0 contratada 1 terminada 2 cancelada
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
