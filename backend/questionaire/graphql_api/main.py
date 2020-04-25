import graphene

from questionaire.graphql_api.survey import CreateSurvey
from questionaire.graphql_api.user import User, Authorize


class UserMutations(graphene.ObjectType):
    auth = Authorize.Field()
    createSurvey = CreateSurvey.Field()


class Query(graphene.ObjectType):
    user = graphene.Field(User)
    user_by_id = graphene.Field(User)


schema = graphene.Schema(query=Query, mutation=UserMutations)
