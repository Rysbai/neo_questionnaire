import os
from dotenv import load_dotenv

load_dotenv()

DEBUG = (os.getenv('DEBUG', "True") == "True")

DB_CONFIG = {
    "DB_NAME": os.getenv("DB_NAME"),
    "DB_USER": os.getenv("DB_USER"),
    "DB_PASSWORD": os.getenv("DB_PASSWORD"),
    "DB_URL": os.getenv("DB_URL"),
    "DB_PORT": os.getenv("DB_PORT")
}


class Config:
    ENV = 'dev'
    DEBUG = (os.getenv('DEBUG', "True") == "True")
    SECRET_KEY = os.getenv('SECRET_KEY', 'secret-key')
    APP_DIR = os.path.abspath(os.path.dirname(__file__))
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))
    SQLALCHEMY_DATABASE_URI = f'postgres+psycopg2://{DB_CONFIG["DB_USER"]}:{DB_CONFIG["DB_PASSWORD"]}' \
                              f'@{DB_CONFIG["DB_URL"]}:{DB_CONFIG["DB_PORT"]}/{DB_CONFIG["DB_NAME"]}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
