
import pytest
from graphene.test import Client

from survey.api.main import schema
from survey.app import create_app
from survey.configs import TestConfig
from survey.extensions import db as _db


@pytest.yield_fixture(scope="function")
def app():
    _app = create_app(TestConfig)

    with _app.app_context():
        _db.create_all()

    ctx = _app.test_request_context()
    ctx.push()

    yield app

    ctx.pop()


@pytest.fixture(scope="function")
def client(app):
    client = Client(schema=schema)
    return client
