import graphene

from questionaire.schemes.user import User, Authorize


class UserMutations(graphene.ObjectType):
    auth = Authorize.Field()


class Query(graphene.ObjectType):
    user = graphene.Field(User)
    user_by_id = graphene.Field(User)


schema = graphene.Schema(query=Query, mutation=UserMutations)
