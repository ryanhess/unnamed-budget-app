from pydantic import BaseModel, Field, computed_field
from sqlalchemy import (
    ForeignKey,
    Identity,
    CheckConstraint,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.database import OrmBase
from enum import Enum


class BudgetEntryType(str, Enum):
    group = "group"
    item = "item"


class BudgetEntry(BaseModel):
    type: BudgetEntryType
    content: "BudgetGroupResponse | BudgetItemResponse"


class EnvelopeCreate(BaseModel):
    year: int = Field(ge=1)
    month: int = Field(ge=1, le=12)
    assigned: float = Field(ge=0)
    budget_item_id: int


class EnvelopeResponse(BaseModel):
    id: int
    year: int
    month: int
    assigned: float
    budget_item_id: int
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
    # not in the table, just used for SqlAlchemy
    budget_item: Mapped["BudgetItemOrm"] = relationship(back_populates="envelopes")


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
    budget_group_id: int | None = None

    # The Budget Item response only wants one envelope,
    # the envelope for the given month.
    envelope: EnvelopeResponse

    class Config:
        from_attributes = True


# SQLAlchemy model for DB layer
class BudgetItemOrm(OrmBase):
    __tablename__ = "budget_items"

    id: Mapped[int] = mapped_column(Identity(always=True), primary_key=True)
    name: Mapped[str]

    # when the group is deleted, the foreign key here is set to NULL
    budget_group_id: Mapped[int | None] = mapped_column(
        ForeignKey("budget_groups.id", ondelete="SET NULL"), nullable=True
    )
    budget_group: Mapped[BudgetGroupOrm | None] = relationship(
        back_populates="budget_items"
    )

    # allows for accessing .envelopes in routes via eager load to build responses
    # Remember that the actual table needs nothing for envelope due to FK
    envelopes: Mapped[list[EnvelopeOrm]] = relationship(
        back_populates="budget_item",
        passive_deletes=True,
    )
