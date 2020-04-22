from flask import Flask

from questionaire.configs import Config
from questionaire.extensions import db, migrate, cors
from questionaire.graphql_api.main import schema
from questionaire.graphql_api.view import MainGraphQLView


def create_app():
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config.from_object(Config)

    register_extensions(app)
    register_graphql(app)
    return app


def register_extensions(app):
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app)


def register_graphql(app):
    app.add_url_rule(
        '/graphql',
        view_func=MainGraphQLView.as_view(
            'graphql',
            schema=schema,
            context={'client': ''},
            graphiql=app.debug
        )
    )
