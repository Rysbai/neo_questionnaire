from flask import request, Response


def solve_options(f):
    def decorator(*args, **kwargs):
        if request.method.lower() == 'options':
            return Response(
                {"message": "OK"},
                status=200
            )

        return f(*args, **kwargs)

    return decorator
