from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    tipo = db.Column(db.Integer, unique=False, nullable=False) #por defecto 0 (usuario normal) 1 si es guía
    nombre = db.Column(db.String(120), unique=False, nullable=True)
    apellidos = db.Column(db.String(120), unique=False, nullable=True)
    ciudad = db.Column(db.String(120), unique=False, nullable=True)
    nacionalidad = db.Column(db.String(120), unique=False, nullable=True)
    calificacion = db.Column(db.Integer, unique=False, nullable=True) # si es guia
    foto = db.Column(db.LargeBinary, unique=False, nullable=True)


    def __repr__(self):
        return f'<Users {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }