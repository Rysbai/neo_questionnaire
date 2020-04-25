from base64 import b64decode

import jwt
from graphql import GraphQLError

from survey.configs import Config


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

        logged_user_id = payload.get('id', None)
        if not logged_user_id:
            raise GraphQLError('auth.failed')

        return logged_user_id


def auth_required(func):
    def resolve(*args, **kwargs):
        token = kwargs.get('token', None)

        logged_user_id = Auth.get_logged_user_id(token)

        return func(logged_user_id=logged_user_id, *args, **kwargs)

    return resolve

