from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey, Sequence, DateTime
from sqlalchemy.orm import relationship


db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer,Sequence('seq_users_id', start=1, increment=1), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    tipo = db.Column(db.Integer, unique=False, nullable=False) #por defecto 0 (usuario normal) 1 si es guía
    descripcion = db.Column(db.Text, unique=False, nullable=True) # se rellena si es guía
    nombre = db.Column(db.String(120), unique=False, nullable=True)
    apellidos = db.Column(db.String(120), unique=False, nullable=True)
    ciudad = db.Column(db.String(120), unique=False, nullable=True)
    foto = db.Column(db.LargeBinary, unique=False, nullable=True)

    def __repr__(self):
        return f'<Users {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }
class Actividades(db.Model):
    id = db.Column(db.Integer, Sequence('seq_actividades_id', start=1, increment=1), primary_key=True)
    nombre = db.Column(db.String(120), unique=True, nullable=False)
    descripcion = db.Column(db.Text, unique=False, nullable=False)
    precio = db.Column(db.String(120), unique=False, nullable=False)
    fecha = db.Column(db.DateTime, unique=True, nullable=False)
    id_guia = db.Column(db.Integer, ForeignKey('users.id'), unique=False, nullable=False)
    ids_usuarios = db.Column(db.Text, unique=False, nullable=True) # array de ids de usuarios que han hecho la actividad
    ciudad = db.Column(db.String(120), unique=False, nullable=False)
    calificacion = db.Column(db.Integer, unique=False, nullable=True)
    foto = db.Column(db.LargeBinary, unique=False, nullable=True)
    rels = relationship(Users)

    def __repr__(self):
        return f'<Actividades {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
        }
class Reservas(db.Model):
    id = db.Column(db.Integer, Sequence('seq_reservas_id', start=1, increment=1), primary_key=True)
    num_reserva = db.Column(db.String(120), unique=True, nullable=False) #generado con uuid
    fecha_reserva = db.Column(db.DateTime, unique=True, nullable=False)
    fecha_inicio = db.Column(db.DateTime, unique=True, nullable=False)
    fecha_fin = db.Column(db.DateTime, unique=True, nullable=False)
    id_actividad = db.Column(db.Integer, ForeignKey('actividades.id'), unique=False, nullable=False)
    estado = db.Column(db.Integer, unique=False, nullable=False) #0 contratada 1 terminada 2 cancelada
    rels = relationship(Actividades)

    def __repr__(self):
        return f'<Reservas {self.nombre}>'

    def serialize(self):
        return {
            "id": self.id,
        }

# una tabla de comentarios de actividad
