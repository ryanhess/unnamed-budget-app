from pydantic import BaseModel, Field, computed_field
from sqlalchemy import (
    ForeignKey,
    Identity,
    CheckConstraint,
    UniqueConstraint,
    literal,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship, column_property
from src.database import OrmBase
from typing import Literal
from transactions.models import TransactionOrm


class BudgetEntry(BaseModel):
    type: Literal["group", "item"]
    content: "BudgetGroupResponse | BudgetItemResponse"


class EnvelopeCreate(BaseModel):
    year: int = Field(ge=1)
    month: int = Field(ge=1, le=12)
    assigned: float = Field(ge=0)
    budget_item_id: int


class EnvelopeResponse(BaseModel):
    id: int
    assigned: float
    spent: float

    @computed_field
    @property
    def available(self) -> float:
        return self.assigned - self.spent

    class Config:
        from_attributes = True


class EnvelopeOrm(OrmBase):
    __tablename__ = "envelopes"
    __table_args__ = (
        UniqueConstraint(
            "budget_item_id", "year", "month", name="unique_budget_item-year-month"
        ),
        CheckConstraint("year > 0", name="year_greater_than_zero"),
        CheckConstraint("month >= 1 AND month <= 12", name="month_in_range"),
        CheckConstraint("assigned >= 0", name="assigned_zero_or_greater"),
    )

    id: Mapped[int] = mapped_column(Identity(always=True), primary_key=True)
    year: Mapped[int]
    month: Mapped[int]
    assigned: Mapped[float]
    budget_item_id: Mapped[int] = mapped_column(
        ForeignKey("budget_items.id", ondelete="CASCADE")
    )

    # not in the table, just used for SqlAlchemy's object oriented relationship
    budget_item: Mapped["BudgetItemOrm"] = relationship(back_populates="all_envelopes")

    spent = column_property(literal(42))  # temporarily 42.


class BudgetGroupCreate(BaseModel):
    name: str


class BudgetGroupUpdate(BaseModel):
    name: str

    # just a list of ids that have to be manually checked
    # for existence in the db.
    budget_item_ids: list[int]


# Pydantic Schema for API layer
class BudgetGroupResponse(BaseModel):
    id: int
    name: str

    # Defined below, so forward import
    budget_items: list["BudgetItemResponse"]

    @computed_field
    @property
    def assigned(self) -> float:
        return sum(item.envelope.assigned for item in self.budget_items)

    @computed_field
    @property
    def spent(self) -> float:
        return sum(item.envelope.spent for item in self.budget_items)

    @computed_field
    @property
    def available(self) -> float:
        return sum(item.envelope.available for item in self.budget_items)

    class Config:
        from_attributes = True


# SQLAlchemy model for DB layer
class BudgetGroupOrm(OrmBase):
    __tablename__ = "budget_groups"

    id: Mapped[int] = mapped_column(Identity(always=True), primary_key=True)
    name: Mapped[str]
    # passive_deletes overrides SqlAlchemy behavior, so deleteion is handled by
    # postgres as defined in BudgetItemOrm
    budget_items: Mapped[list["BudgetItemOrm"]] = relationship(
        back_populates="budget_group", passive_deletes=True
    )


class BudgetItemCreate(BaseModel):
    name: str
    budget_group_id: int | None = None


class BudgetItemUpdate(BaseModel):
    name: str | None = None
    budget_group_id: int | None = None


class BudgetItemResponse(BaseModel):
    id: int
    name: str

    envelope: EnvelopeResponse

    class Config:
        from_attributes = True


# SQLAlchemy model for DB layer
class BudgetItemOrm(OrmBase):
    __tablename__ = "budget_items"
    __allow_unmapped__ = True

    id: Mapped[int] = mapped_column(Identity(always=True), primary_key=True)
    name: Mapped[str]

    # when the group is deleted, the foreign key here is set to NULL
    budget_group_id: Mapped[int | None] = mapped_column(
        ForeignKey("budget_groups.id", ondelete="SET NULL"), nullable=True
    )
    budget_group: Mapped[BudgetGroupOrm | None] = relationship(
        back_populates="budget_items"
    )

    transactions: Mapped[list[TransactionOrm]] = relationship(
        back_populates="budget_item"
    )

    # not a column in DB, enables leveraging relationship in routes.
    all_envelopes: Mapped[list[EnvelopeOrm]] = relationship(
        back_populates="budget_item",
        passive_deletes=True,
    )

    # must be set in code, is not loaded from db. This is basically to prevent having
    # the schema return an array of always one item when getting a monthly budget.
    envelope: EnvelopeOrm | None = None
