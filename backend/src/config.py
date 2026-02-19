from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# .env file is .parent.parent.parent -> project_root/
root_directory = Path(__file__).resolve().parent.parent.parent

class Settings(BaseSettings):
    DATABASE_URL: str

    model_config = SettingsConfigDict(
        # Points specifically to root/.env
        env_file=root_directory / ".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

# Pydantic ensures this is instantiated correctly at runtime
settings = Settings() # type: ignore