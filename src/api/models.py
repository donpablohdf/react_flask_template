from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Sequence, DateTime
from sqlalchemy.orm import relationship


db = SQLAlchemy()
class Users(db.Model):
    id = db.Column(db.Integer,Sequence('users_id_seq', start=1, increment=1), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    tipo = db.Column(db.Integer, unique=False, nullable=False) #por defecto 0 (usuario normal) 1 si es guía
    descripcion = db.Column(db.Text, unique=False, nullable=True) # se rellena si es guía
    nombre = db.Column(db.String(120), unique=False, nullable=True)
    apellidos = db.Column(db.String(120), unique=False, nullable=True)
    ciudad = db.Column(db.String(120), unique=False, nullable=True)
    foto = db.Column(db.String(120), unique=False, nullable=True)
    

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

            
        }
    @classmethod
    def get_by_id(self, pid):
        return self.query.filter_by(id=pid).first()

    @classmethod
    def new_user(self, user):
        new_user = Users(email=user['email'], password= user['password'], tipo =0)
        db.session.add(new_user)
        db.session.commit()
        return True

    @classmethod
    def delete_by_id(self, pid):
        user = self.query.get(pid)
        if user:
            db.session.delete(user)
            db.session.commit()
            return "Usuario borrado con exito"
        return False

    @classmethod
    def new_user(self, user):        
        new_user = Users(email=user['email'], password= user['password'], tipo= 0)
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
