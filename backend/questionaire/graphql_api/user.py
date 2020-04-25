import graphene as graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

from questionaire.models import User as UserORM


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserORM

    def resolve_id(parent, info):
        return parent.id


class Authorize(graphene.Mutation):
    class Arguments:
        name = graphene.String()

    user = graphene.Field(lambda: User)
    message = graphene.String()

    def resolve_user(parent, info, *args, **kwargs):
        user = parent.user
        return User(id=user.id, name=user.name)

    def mutate(self, info, name):
        new_user = UserORM.create(name=name)
        user = User(id=new_user.id, name=name)
        return Authorize(message="ok", user=user)
