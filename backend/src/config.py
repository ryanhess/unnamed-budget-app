## src/config.py ##
# creates a Pydantic class containing environment variables
# does all the work to pull the environment variables from a .env
# file located at the app's root directory

from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

# .env file is .parent.parent.parent -> project_root/ (sibling to frontend and backend)
root_directory = Path(__file__).resolve().parent.parent.parent


class Env_Vars(BaseSettings):
    DATABASE_URL: str

    model_config = SettingsConfigDict(
        # Points specifically to root/.env
        env_file=root_directory / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )


# Pydantic ensures this is instantiated correctly at runtime
env_vars = Env_Vars()  # type: ignore
