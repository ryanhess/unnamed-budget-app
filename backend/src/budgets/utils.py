from sqlalchemy import (
    select,
)
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


def _envelope_is_for_month(year: int, month: int):  # noqa ANN202
    return (EnvelopeOrm.year == year) & (EnvelopeOrm.month == month)


def _budget_item_has_envelope_for_month(year: int, month: int):  # noqa ANN202
    return BudgetItemOrm.all_envelopes.any(_envelope_is_for_month(year, month))


def _get_ungrouped_budget_items_query_for_month(year: int, month: int):  # noqa ANN202
    return (
        select(BudgetItemOrm)
        .where(
            _budget_item_has_envelope_for_month(year, month),
            BudgetItemOrm.budget_group_id.is_(None),
        )
        .options(
            selectinload(
                BudgetItemOrm.all_envelopes.and_(_envelope_is_for_month(year, month))
            )
        )
    )


def _get_budget_groups_query_for_month(year: int, month: int):  # noqa ANN202
    return (
        select(BudgetGroupOrm)
        .where(
            BudgetGroupOrm.budget_items.any(
                _budget_item_has_envelope_for_month(year, month)
            )
        )
        .options(
            selectinload(
                BudgetGroupOrm.budget_items.and_(
                    _budget_item_has_envelope_for_month(year, month)
                )
            ).selectinload(
                BudgetItemOrm.all_envelopes.and_(_envelope_is_for_month(year, month))
            )
        )
    )


async def get_monthly_budget(
    year: int, month: int, db: AsyncSession
) -> list[BudgetEntry]:
    this_month_ungrouped_item_orms = (
        (await db.execute(_get_ungrouped_budget_items_query_for_month(year, month)))
        .scalars()
        .all()
    )

    this_month_group_orms = (
        (await db.execute(_get_budget_groups_query_for_month(year, month)))
        .scalars()
        .all()
    )

    budget_entries: list[BudgetEntry] = []

    for group_orm in this_month_group_orms:
        for grouped_item in group_orm.budget_items:
            # the selected envelope must be set manually from the
            # eagerly loaded envelope
            grouped_item.envelope = grouped_item.all_envelopes[0]

        group = BudgetGroupResponse.model_validate(group_orm)
        new_entry = BudgetEntry(type="group", content=group)
        budget_entries.append(new_entry)

    for item_orm in this_month_ungrouped_item_orms:
        # the selected envelope must be set manually from the
        # eagerly loaded envelope
        item_orm.envelope = item_orm.all_envelopes[0]
        item = BudgetItemResponse.model_validate(item_orm)
        new_entry = BudgetEntry(type="item", content=item)
        budget_entries.append(new_entry)

    return budget_entries
