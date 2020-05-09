"""empty message

Revision ID: 0514134a9ac3
Revises: 5c4da37ae39c
Create Date: 2020-05-01 14:05:42.350009

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '0514134a9ac3'
down_revision = '5c4da37ae39c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('questionnaire', sa.Column('is_actual', sa.Boolean(), nullable=True))
    op.drop_column('questionnaire', 'start_at')
    op.drop_column('questionnaire', 'end_at')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('questionnaire', sa.Column('end_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.add_column('questionnaire', sa.Column('start_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.drop_column('questionnaire', 'is_actual')
    # ### end Alembic commands ###
