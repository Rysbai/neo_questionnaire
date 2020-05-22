from sqlalchemy.orm import backref

from survey.extensions import db
from survey.models.user import User
from survey.models.utils import Model, SurrogatePK, reference_col, relationship


class Survey(Model, SurrogatePK):
    __tablename__ = 'survey'

    id = db.Column(db.Integer, primary_key=True)
    owner_id = reference_col(User.__tablename__, nullable=False)
    title = db.Column(db.String)
    description = db.Column(db.String)
    is_anonymous = db.Column(db.Boolean)
    is_actual = db.Column(db.Boolean, default=True)


class Question(Model, SurrogatePK):
    __tablename__ = 'question'

    id = db.Column(db.Integer, primary_key=True)
    survey_id = reference_col(Survey.__tablename__, nullable=False)
    survey = relationship(Survey,
                          backref=backref('questions', uselist=True, cascade='delete,all'))
    position = db.Column(db.Integer)
    payload = db.Column(db.String)
    allow_multiple_answer = db.Column(db.Boolean)


class Option(Model, SurrogatePK):
    __tablename__ = 'option'

    id = db.Column(db.Integer, primary_key=True)
    question_id = reference_col(Question.__tablename__, nullable=False)
    question = relationship(Question,
                            backref=backref('options', uselist=True, cascade='delete,all'))
    payload = db.Column(db.String)


class UserAnswer(Model, SurrogatePK):
    __tablename__ = 'answer'

    id = db.Column(db.Integer, primary_key=True)
    option_id = reference_col(Option.__tablename__, nullable=False)
    option = relationship(Option,
                          backref=backref('answers', uselist=True, cascade='delete,all'))
    user_id = reference_col(User.__tablename__, nullable=False)
    voted_at = db.Column(db.DateTime)
