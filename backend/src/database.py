from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from collections.abc import AsyncGenerator
from src.config import settings

database_url = settings.DATABASE_URL

engine = create_async_engine(database_url)
async_session = async_sessionmaker(engine, expire_on_commit=False)

class OrmBase(DeclarativeBase):
    pass

async def get_db() -> AsyncGenerator[AsyncSession]:
    async with async_session() as session:
        yield session