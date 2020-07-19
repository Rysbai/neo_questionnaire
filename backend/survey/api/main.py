import json

import graphene
from graphql import GraphQLError

from survey.models.survey import Survey as SurveyORM, Question
from survey.api.survey import CreateSurvey, EditSurvey, CreateQuestion, EditQuestion, CreateOption, SaveUserAnswer, \
    PublishSurvey
from survey.api.types import Survey, User, QuestionResult
from survey.api.user import Authorize
from survey.services.decorators import auth_required


class Mutations(graphene.ObjectType):
    auth = Authorize.Field()
    create_survey = CreateSurvey.Field()
    publish_survey = PublishSurvey.Field()
    create_question = CreateQuestion.Field()
    create_option = CreateOption.Field()
    edit_survey = EditSurvey.Field()
    edit_question = EditQuestion.Field()
    save_user_answer = SaveUserAnswer.Field()


class Query(graphene.ObjectType):
    surveys = graphene.List(Survey, page=graphene.Int(), per_page=graphene.Int())
    survey = graphene.Field(Survey, id=graphene.ID())
    survey_by_code = graphene.Field(Survey, code=graphene.String())
    survey_results = graphene.Field(graphene.List(QuestionResult), survey_id=graphene.ID())
    question_result = graphene.Field(QuestionResult, id=graphene.ID())
    user = graphene.Field(User)

    @auth_required
    def resolve_survey(self, info, id, *args, **kwargs):
        survey = SurveyORM.get_by_id(id)
        if not survey:
            raise GraphQLError("survey.does.not.exist")

        return Survey(
            id=survey.id,
            owner_id=survey.owner_id,
            code=survey.code,
            title=survey.title,
            description=survey.description,
            is_anonymous=survey.is_anonymous,
            is_open=survey.is_open,
            is_actual=survey.is_actual
        )

    @auth_required
    def resolve_survey_by_code(self, info, code, **kwargs):
        survey = SurveyORM.query.filter(SurveyORM.code == code, SurveyORM.is_open == True).first()

        if not survey:
            raise GraphQLError('survey.does.not.exists')

        return Survey(
            id=survey.id,
            owner_id=survey.owner_id,
            code=survey.code,
            title=survey.title,
            description=survey.description,
            is_anonymous=survey.is_anonymous,
            is_open=survey.is_open,
            is_actual=survey.is_actual
        )

    @auth_required
    def resolve_surveys(self, info, page=1, per_page=10, **kwargs):
        pagination = SurveyORM.query.filter(SurveyORM.is_actual == True, SurveyORM.is_open == True)\
            .paginate(page=page, per_page=per_page)
        surveys = []
        for survey in pagination.items:
            surveys.append(
                Survey(
                    id=survey.id,
                    title=survey.title,
                    description=survey.description,
                    is_anonymous=survey.is_anonymous,
                    is_actual=survey.is_actual,
                    is_open=survey.is_open
                )
            )

        return surveys

    @auth_required
    def resolve_survey_results(self, info, survey_id, *args, **kwargs):
        queryset = Question.query.filter(Question.survey_id == survey_id)

        questions = []
        for question in queryset:
            questions.append(
                QuestionResult(
                    id=question.id,
                    payload=question.payload
                )
            )

        return questions

    def resolve_question_result(self, info, id, *args, **kwargs):
        question = Question.get_by_id(id)

        if not question:
            raise GraphQLError('question.does.not.exist')

        return QuestionResult(
            id=question.id,
            payload=question.payload
        )


schema = graphene.Schema(query=Query, mutation=Mutations)
