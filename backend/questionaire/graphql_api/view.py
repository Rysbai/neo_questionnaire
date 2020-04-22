from flask_graphql import GraphQLView

from questionaire.services.decorators import solve_options


class MainGraphQLView(GraphQLView):
    decorators = [solve_options, ]

