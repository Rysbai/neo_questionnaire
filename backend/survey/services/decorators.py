from flask import request, Response

from survey.services.auth import Auth


def solve_options(f):
    def decorator(*args, **kwargs):
        if request.method.lower() == 'options':
            return Response(
                {"message": "OK"},
                status=200
            )

        return f(*args, **kwargs)

    return decorator


def auth_required(func):
    def resolve(*args, **kwargs):
        token = kwargs.get('token', None)

        logged_user_id = Auth.get_logged_user_id(token)

        return func(logged_user_id=logged_user_id, *args, **kwargs)

    return resolve