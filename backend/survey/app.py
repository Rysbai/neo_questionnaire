from flask import Flask

from survey.extensions import db, migrate, cors
from survey.api.main import schema
from survey.api.view import MainGraphQLView


def create_app(config):
    app = Flask(__name__)
    app.url_map.strict_slashes = False
    app.config.from_object(config)

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
