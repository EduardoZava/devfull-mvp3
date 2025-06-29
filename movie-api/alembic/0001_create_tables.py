"""create reviews table

Revision ID: 0001
Revises: 
Create Date: 2025-05-25

"""
from alembic import op
import sqlalchemy as sa

revision = '0001'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'reviews',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('imdb_id', sa.String(length=20), nullable=False),
        sa.Column('user_opinion', sa.Text, nullable=False),
        sa.Column('user_rating', sa.Integer, nullable=False),
        'movie',
        sa.Column('imdb_id', sa.String(length=20), sa.ForeignKey('movies.imdb_id', ondelete='CASCADE'), nullable=False
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


def downgrade():
    op.drop_table('reviews')
