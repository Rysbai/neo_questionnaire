from flask import Flask
from flask_graphql import GraphQLView

from questionaire.configs import Config
from questionaire.extensions import db, migrate
from questionaire.schemes.main import schema


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config.from_object(Config)

    _register_extensions(app)
    _register_graphql(app)
    return app


def _register_extensions(app):
    db.init_app(app)
    migrate.init_app(app, db)


def _register_graphql(app):
    app.add_url_rule(
        '/graphql',
        view_func=GraphQLView.as_view(
            'graphql',
            schema=schema,
            context={'client': ''},
            graphiql=app.debug
        )
    )
