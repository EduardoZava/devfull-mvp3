"""second

Revision ID: f6b219582789
Revises: 897e33d09f56
Create Date: 2025-06-05 03:09:10.092775+00:00

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f6b219582789'
down_revision: Union[str, None] = '897e33d09f56'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'movie',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('imdb_id', sa.String(length=20), nullable=False
        ),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('year', sa.Integer, nullable=False),
        sa.Column('genre', sa.String(length=100), nullable=False),
        sa.Column('director', sa.String(length=100), nullable=False),
        #sa.Column('actors', sa.Text, nullable=False),  # Store as comma-separated string
        sa.Column('actors', sa.ARRAY(sa.String), nullable=True),  # Store as a list of strings
        sa.Column('imdb_rating', sa.String(length=10), nullable=True),
        sa.Column('plot', sa.Text, nullable=True),
        sa.Column('reviews', sa.ARRAY(sa.String), nullable=True),  # Store as JSON or similar format
    )


def downgrade() -> None:
    """Downgrade schema."""
    pass
