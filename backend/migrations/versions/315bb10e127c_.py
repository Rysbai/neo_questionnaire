"""empty message

Revision ID: 315bb10e127c
Revises: 2fd70798138d
Create Date: 2020-06-18 17:26:37.851594

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '315bb10e127c'
down_revision = '2fd70798138d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('survey', sa.Column('is_open', sa.Boolean(), nullable=True))
    op.drop_column('survey', 'is_actual')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('survey', sa.Column('is_actual', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.drop_column('survey', 'is_open')
    # ### end Alembic commands ###
