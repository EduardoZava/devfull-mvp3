"""first

Revision ID: 897e33d09f56
Revises: 
Create Date: 2025-06-02 03:55:37.451435+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '897e33d09f56'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.create_table(
        'reviews',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('imdb_id', sa.String(length=20), nullable=False),
        sa.Column('user_opinion', sa.Text, nullable=False),
        sa.Column('user_rating', sa.Integer, nullable=False),
    )

def downgrade():
    op.drop_table('reviews')
