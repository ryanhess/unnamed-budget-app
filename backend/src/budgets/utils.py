from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from src.budgets.models import (
    BudgetGroupOrm,
    BudgetEntry,
    BudgetItemOrm,
    EnvelopeOrm,
    BudgetGroupResponse,
    BudgetItemResponse,
)
from fastapi import HTTPException


async def validate_group_id_return_group(
    group_id: int | None, db: AsyncSession
) -> BudgetGroupOrm | None:
    # specifying no group is a valid request.
    if group_id is None:
        return None

    group = await db.get(BudgetGroupOrm, group_id)
    if group is None:
        raise HTTPException(
            status_code=422, detail="Bad request: specified a nonexistent budget group"
        )

    return group


async def get_monthly_budget(
    year: int, month: int, db: AsyncSession
) -> list[BudgetEntry]:
    # fmt: off
    envelope_is_for_this_month = (
        (EnvelopeOrm.year == year) & (EnvelopeOrm.month == month)
    )

    budget_item_has_envelope_for_month = (
        BudgetItemOrm.envelopes.any(
            envelope_is_for_this_month
        )
    )

    this_month_ungrouped_items_query = (
        select(BudgetItemOrm)
        .where(
            budget_item_has_envelope_for_month,
            BudgetItemOrm.budget_group_id.is_(None),
        )
        .options(
            selectinload(
                BudgetItemOrm.envelopes.and_(envelope_is_for_this_month)
            )
        )
    )

    this_month_groups_query = (
        select(BudgetGroupOrm)
        .where(BudgetGroupOrm.budget_items.any(budget_item_has_envelope_for_month))
        .options(
            selectinload(
                BudgetGroupOrm.budget_items.and_(budget_item_has_envelope_for_month)
            )
            .selectinload(
                BudgetItemOrm.envelopes.and_(envelope_is_for_this_month)
            )
        )
    )

    this_month_ungrouped_item_orms = (
        await db.execute(this_month_ungrouped_items_query)
    ).scalars().all()

    this_month_group_orms = (
        await db.execute(this_month_groups_query)
    ).scalars().all()

    # fmt: on

    budget_entries: list[BudgetEntry] = []

    for group_orm in this_month_group_orms:
        group = BudgetGroupResponse.model_validate(group_orm)
        new_entry = BudgetEntry(type="group", content=group)
        budget_entries.append(new_entry)

    for item_orm in this_month_ungrouped_item_orms:
        item = BudgetItemResponse.model_validate(item_orm)
        new_entry = BudgetEntry(type="item", content=item)
        budget_entries.append(new_entry)

    return budget_entries
