from graphene_sqlalchemy import SQLAlchemyObjectType

from survey.models import Question as QuestionORM, User as UserORM, Option as OptionORM
from survey.models import SurveyORM


class Option(SQLAlchemyObjectType):
    class Meta:
        model = OptionORM

    def resolve_id(parent, info):
        return parent.id

    @staticmethod
    def init_field(id, question_id, payload, *args, **kwargs):
        return Question(
            id=id,
            question_id=question_id,
            payload=payload
        )


class Question(SQLAlchemyObjectType):
    class Meta:
        model = QuestionORM

    def resolve_id(parent, info):
        return parent.id

    def resolve_options(parent, info, *args):
        options = OptionORM.query.filter_by(question_id=parent.id)
        return [Option.init_field(**option.__dict__) for option in options]

    @staticmethod
    def init_field(id: int,
                   survey_id: int,
                   position: int,
                   payload: str,
                   allow_multiple_answer: bool = False,
                   *args, **kwargs):
        return Question(
            id=id,
            survey_id=survey_id,
            position=position,
            payload=payload,
            allow_multiple_answer=allow_multiple_answer
        )


class Survey(SQLAlchemyObjectType):
    class Meta:
        model = SurveyORM

    def resolve_id(parent, info):
        return parent.id

    def resolve_questions(parent, info, *args):
        questions = QuestionORM.query.filter_by(survey_id=parent.id)
        return [Question.init_field(**question.__dict__) for question in questions]


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserORM

    def resolve_id(parent, info):
        return parent.id
