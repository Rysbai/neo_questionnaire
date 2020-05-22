import jwt
from graphql import GraphQLError

from survey.configs import Config
from survey.models import User


class Auth:
    @staticmethod
    def create_token(user_id):
        token = jwt.encode({"id": user_id}, Config.SECRET_KEY, algorithm='HS256')

        return token.decode('utf-8')

    @staticmethod
    def get_logged_user_id(token):
        try:
            payload = jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
        except jwt.exceptions.InvalidTokenError:
            raise GraphQLError('auth.failed')

        user_id = payload.get('id', None)

        if not user_id:
            raise GraphQLError('auth.failed')

        user = User.get_by_id(user_id)
        if not user:
            raise GraphQLError('auth.failed')

        return user_id


