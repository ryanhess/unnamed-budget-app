from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from collections.abc import AsyncGenerator

DATABASE_URL = "postgresql+psycopg://postgres:postgres@localhost:5432/budget_app"

engine = create_async_engine(DATABASE_URL)
async_session = async_sessionmaker(engine, expire_on_commit=False)

class OrmBase(DeclarativeBase):
    pass

async def get_db() -> AsyncGenerator[AsyncSession]:
    async with async_session() as session:
        yield session