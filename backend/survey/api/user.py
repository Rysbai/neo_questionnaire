import graphene as graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

from survey.models import User as UserORM
from survey.services.auth import Auth


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
    token = graphene.String()

    def resolve_user(parent, info, *args, **kwargs):
        user = parent.user
        return User(id=user.id, name=user.name)

    def mutate(self, info, name):
        new_user = UserORM.create(name=name)
        user = User(id=new_user.id, name=name)
        token = Auth.create_token(new_user.id)
        return Authorize(user=user, token=token, message="ok")
