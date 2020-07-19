from flask_socketio import SocketIO, emit

from survey.app import create_app
from survey.configs import Config
from survey.api.main import schema


app = create_app(Config)

socket_io = SocketIO(app, async_mode="eventlet")
socket_io.init_app(app, cors_allowed_origins="*")


@socket_io.on('connect', namespace='/update-question-results')
def update_questions(*args, **kwargs):
    emit('my response', {'data': 'Connected'})


@socket_io.on('update-user-answer', namespace='/update-question-results')
def update_user_answer(data: dict):
    mutation_query = '''
      mutation SaveUserAnswer ($userId: ID!, $questionId: ID!, $options: [ID]) {
        saveUserAnswer (userId: $userId, questionId: $questionId, options: $options) {
          message
        }
      }        
    '''

    result = schema.execute(mutation_query, variables=data)
    if result.data['saveUserAnswer']['message'] == 'ok':
        query = '''
            query QuestionResult ($id: ID!) {
                questionResult(id: $id) {
                   id,
                    payload,
                    optionResults {
                          optionId,
                          payload,
                          answers
                    }                
                }
            }            
        '''
        result = schema.execute(query, variables={"id": data['questionId']})
        emit('question-result-change',
             result.data['questionResult'],
             namespace='/update-question-results',
             broadcast=True)


if __name__ == '__main__':
    socket_io.run(app, host='0.0.0.0', port='5000')
