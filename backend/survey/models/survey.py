from sqlalchemy.orm import backref

from survey.extensions import db
from survey.models.user import User
from survey.models.utils import Model, SurrogatePK, reference_col, relationship


class Questionnaire(Model, SurrogatePK):
    __tablename__ = 'questionnaire'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = reference_col(User.__tablename__, nullable=False)
    title = db.Column(db.String)
    description = db.Column(db.String)
    is_anonymous = db.Column(db.Boolean)
    is_actual = db.Column(db.Boolean, default=True)


class Question(Model, SurrogatePK):
    __tablename__ = 'question'

    id = db.Column(db.Integer, primary_key=True)
    questionnaire_id = reference_col(Questionnaire.__tablename__, nullable=False)
    questionnaire = relationship(Questionnaire,
                                 backref=backref('questions', uselist=True, cascade='delete,all')
                                 )
    payload = db.Column(db.String)
    allow_multiple_answer = db.Column(db.Boolean)


class Answer(Model, SurrogatePK):
    __tablename__ = 'answer'

    id = db.Column(db.Integer, primary_key=True)
    question_id = reference_col(Question.__tablename__, nullable=False)
    question = relationship(Question,
                            backref=backref('answers', uselist=True, cascade='delete,all')
                            )
    payload = db.Column(db.String)


class UserAnswer(Model, SurrogatePK):
    __tablename__ = 'user_answer'

    id = db.Column(db.Integer, primary_key=True)
    answer_id = reference_col(Answer.__tablename__, nullable=False)
    user_id = reference_col(User.__tablename__, nullable=False)

    voted_at = db.Column(db.DateTime)
