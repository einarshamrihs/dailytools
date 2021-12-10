import os
from dotenv import load_dotenv
from pydantic import BaseSettings, Field

project_folder = os.path.expanduser("~/dailytools")
env_path = os.path.join(project_folder, ".env")
if os.path.exists(env_path):
    load_dotenv(env_path, verbose=True)
else:
    load_dotenv(verbose=True)

class Settings(BaseSettings):
    # default values to None for unit tests
    http_port: int = Field(None, env="HTTP_PORT")
    ssl_context: str = Field(None, env="SSL_CONTEXT")
