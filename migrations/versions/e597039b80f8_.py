"""empty message

Revision ID: e597039b80f8
Revises: 
Create Date: 2022-12-16 21:40:33.427772

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e597039b80f8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.Column('tipo', sa.Integer(), nullable=False),
    sa.Column('descripcion', sa.Text(), nullable=True),
    sa.Column('nombre', sa.String(length=120), nullable=True),
    sa.Column('apellidos', sa.String(length=120), nullable=True),
    sa.Column('ciudad', sa.String(length=120), nullable=True),
    sa.Column('foto', sa.String(length=120), nullable=True),
    sa.Column('activo', sa.Integer(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('actividades',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=120), nullable=False),
    sa.Column('descripcion', sa.Text(), nullable=False),
    sa.Column('precio', sa.String(length=120), nullable=False),
    sa.Column('fecha', sa.DateTime(), nullable=False),
    sa.Column('id_guia', sa.Integer(), nullable=False),
    sa.Column('ids_usuarios', sa.Text(), nullable=True),
    sa.Column('ciudad', sa.String(length=120), nullable=False),
    sa.Column('calificacion', sa.Integer(), nullable=True),
    sa.Column('foto', sa.String(length=120), nullable=True),
    sa.Column('activo', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_guia'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comentarios',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('id_actividad', sa.Integer(), nullable=False),
    sa.Column('id_usuario', sa.Integer(), nullable=False),
    sa.Column('texto', sa.Text(), nullable=False),
    sa.Column('activo', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_actividad'], ['actividades.id'], ),
    sa.ForeignKeyConstraint(['id_usuario'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('texto')
    )
    op.create_table('reservas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('num_reserva', sa.String(length=120), nullable=False),
    sa.Column('fecha_reserva', sa.DateTime(), nullable=False),
    sa.Column('fecha_realizacion', sa.DateTime(), nullable=True),
    sa.Column('id_actividad', sa.Integer(), nullable=False),
    sa.Column('id_usuario', sa.Integer(), nullable=False),
    sa.Column('id_guia', sa.Integer(), nullable=False),
    sa.Column('estado', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_actividad'], ['actividades.id'], ),
    sa.ForeignKeyConstraint(['id_usuario'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('num_reserva')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reservas')
    op.drop_table('comentarios')
    op.drop_table('actividades')
    op.drop_table('users')
    # ### end Alembic commands ###
