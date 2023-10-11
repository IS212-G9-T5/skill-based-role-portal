"""initial migration

Revision ID: ab350ec2caf0
Revises: 4727423ee37c
Create Date: 2023-10-04 23:33:03.439456

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ab350ec2caf0'
down_revision = '4727423ee37c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('access_control',
    sa.Column('access_id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('access_control_name', sa.Enum('User', 'Admin', 'Manager', 'HR', name='accesscontrolrole'), nullable=False),
    sa.PrimaryKeyConstraint('access_id')
    )
    op.create_table('role',
    sa.Column('role_name', sa.VARCHAR(length=50), nullable=False),
    sa.Column('role_desc', sa.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('role_name')
    )
    op.create_table('skill',
    sa.Column('skill_name', sa.VARCHAR(length=50), nullable=False),
    sa.Column('skill_desc', sa.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('skill_name')
    )
    op.create_table('role_listing',
    sa.Column('role_listing_id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('role_name', sa.VARCHAR(length=50), nullable=False),
    sa.Column('start_date', sa.DATE(), nullable=False),
    sa.Column('end_date', sa.DATE(), nullable=False),
    sa.Column('status', sa.Enum('OPEN', 'CLOSED', 'PENDING', name='rolestatus'), nullable=False),
    sa.ForeignKeyConstraint(['role_name'], ['role.role_name'], ),
    sa.PrimaryKeyConstraint('role_listing_id')
    )
    op.create_table('role_skill',
    sa.Column('role_name', sa.VARCHAR(length=50), nullable=True),
    sa.Column('skill_name', sa.VARCHAR(length=50), nullable=True),
    sa.ForeignKeyConstraint(['role_name'], ['role.role_name'], ),
    sa.ForeignKeyConstraint(['skill_name'], ['skill.skill_name'], )
    )
    op.create_table('staff',
    sa.Column('staff_id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('staff_fname', sa.VARCHAR(length=50), nullable=False),
    sa.Column('staff_lname', sa.VARCHAR(length=50), nullable=False),
    sa.Column('dept', sa.VARCHAR(length=50), nullable=False),
    sa.Column('country', sa.VARCHAR(length=50), nullable=False),
    sa.Column('email', sa.VARCHAR(length=50), nullable=False),
    sa.Column('role_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['role_id'], ['access_control.access_id'], ),
    sa.PrimaryKeyConstraint('staff_id')
    )
    op.create_table('role_application',
    sa.Column('role_listing_id', sa.INTEGER(), nullable=True),
    sa.Column('staff_id', sa.INTEGER(), nullable=True),
    sa.Column('application_status', sa.Enum('ACCEPTED', 'REJECTED', 'PENDING', name='applicationstatus'), nullable=False),
    sa.ForeignKeyConstraint(['role_listing_id'], ['role_listing.role_listing_id'], ),
    sa.ForeignKeyConstraint(['staff_id'], ['staff.staff_id'], )
    )
    op.create_table('staff_skill',
    sa.Column('skill_name', sa.VARCHAR(length=50), nullable=True),
    sa.Column('staff_id', sa.INTEGER(), nullable=True),
    sa.ForeignKeyConstraint(['skill_name'], ['skill.skill_name'], ),
    sa.ForeignKeyConstraint(['staff_id'], ['staff.staff_id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('staff_skill')
    op.drop_table('role_application')
    op.drop_table('staff')
    op.drop_table('role_skill')
    op.drop_table('role_listing')
    op.drop_table('skill')
    op.drop_table('role')
    op.drop_table('access_control')
    # ### end Alembic commands ###
