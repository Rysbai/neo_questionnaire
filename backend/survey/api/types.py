import graphene
from graphene import InputObjectType
from graphene_sqlalchemy import SQLAlchemyObjectType

from survey.models import Question as QuestionORM, User as UserORM, Option as OptionORM, UserAnswer
from survey.models import SurveyORM


class Option(SQLAlchemyObjectType):
    class Meta:
        model = OptionORM

    def resolve_id(parent, info):
        return parent.id

    @staticmethod
    def init_field(id, question_id, payload, *args, **kwargs):
        return Option(
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

    def resolve_owner(self, info, *args):
        owner = UserORM.get_by_id(self.owner_id)
        return User(
            id=owner.id,
            name=owner.name
        )

    def resolve_questions(parent, info, *args):
        questions = QuestionORM.query.filter_by(survey_id=parent.id)
        return [Question.init_field(**question.__dict__) for question in questions]


class User(SQLAlchemyObjectType):
    class Meta:
        model = UserORM

    def resolve_id(parent, info):
        return parent.id


class OptionInput(InputObjectType):
    id = graphene.ID(required=False)
    question_id = graphene.ID(required=False)
    payload = graphene.String(required=True)
    allow_multiple_choice = graphene.Boolean(default=False)


class OptionResult(graphene.ObjectType):
    option_id = graphene.ID()
    payload = graphene.String()
    answers = graphene.Int()

    def resolve_answers(self, info, *args, **kwargs):
        answers_count = UserAnswer.query.filter(UserAnswer.option_id == self.option_id).count()

        return answers_count

    def resolve_payload(self, info, *args, **kwargs):
        return self.payload


class QuestionResult(graphene.ObjectType):
    id = graphene.ID()
    payload = graphene.String()
    option_results = graphene.List(OptionResult)

    def resolve_option_results(self, info, *args, **kwargs):
        queryset = OptionORM.query.filter(OptionORM.question_id == self.id)

        option_results = []
        for option in queryset:
            option_results.append(
                OptionResult(
                    option_id=option.id,
                    payload=option.payload
                )
            )

        return option_results
