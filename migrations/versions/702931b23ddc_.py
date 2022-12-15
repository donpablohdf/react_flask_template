"""empty message

Revision ID: 702931b23ddc
Revises: 
Create Date: 2022-12-09 14:27:46.312640

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '702931b23ddc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('tipo', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=120), nullable=True),
    sa.Column('apellidos', sa.String(length=120), nullable=True),
    sa.Column('ciudad', sa.String(length=120), nullable=True),
    sa.Column('nacionalidad', sa.String(length=120), nullable=True),
    sa.Column('calificacion', sa.Integer(), nullable=True),
    sa.Column('foto', sa.LargeBinary(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('users')
    # ### end Alembic commands ###