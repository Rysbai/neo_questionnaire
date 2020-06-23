from flask_socketio import SocketIO

from survey.app import create_app
from survey.configs import Config

app = create_app(Config)

socket_io = SocketIO(app)


if __name__ == '__main__':
    socket_io.run(app)
