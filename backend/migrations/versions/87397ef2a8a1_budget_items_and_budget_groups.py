"""budget_items and budget_groups

Revision ID: 87397ef2a8a1
Revises: 670e47e1d683
Create Date: 2026-02-21 08:41:37.323757

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '87397ef2a8a1'
down_revision: Union[str, Sequence[str], None] = '670e47e1d683'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # budget_groups
    op.create_table('budget_groups',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )

    # budget_items
    op.create_table('budget_items',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('assigned', sa.Float(), nullable=False),
    sa.Column('spent', sa.Float(), nullable=False),
    sa.Column('budget_group_id', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['budget_group_id'], ['budget_groups.id'], ),
    sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_table('budget_items')
    op.drop_table('budget_groups')
