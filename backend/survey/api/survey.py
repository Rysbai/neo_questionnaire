import graphene as graphene
from graphql import GraphQLError

from survey.api.types import Survey, Question, Option, OptionInput
from survey.models import SurveyORM, Question as QuestionORM, Option as OptionORM, UserAnswer
from survey.services.decorators import auth_required
from survey.utils.survey_code_generator import generate_survey_code


class CreateSurvey(graphene.Mutation):
    class Arguments:
        title = graphene.String()
        description = graphene.String()
        is_anonymous = graphene.Boolean(required=False)
        is_open = graphene.Boolean(required=False)

    survey = graphene.Field(lambda: Survey)
    message = graphene.String()

    @auth_required
    def mutate(self, info, logged_user_id, title, description, is_anonymous, is_open=False, *args, **kwargs):
        new_survey = SurveyORM.create(
            owner_id=logged_user_id,
            code=generate_survey_code(),
            title=title,
            description=description,
            is_anonymous=is_anonymous,
            is_open=is_open,
            is_actual=False
        )
        survey = Survey(
            id=new_survey.id,
            owner_id=new_survey.owner_id,
            code=new_survey.code,
            title=new_survey.title,
            description=new_survey.description,
            is_anonymous=new_survey.is_anonymous,
            is_open=new_survey.is_open,
            is_actual=new_survey.is_actual
        )
        return CreateSurvey(survey=survey, message='ok')


class EditSurvey(graphene.Mutation):
    class Arguments:
        survey_id = graphene.ID()
        title = graphene.String(required=False)
        description = graphene.String(required=False)
        is_anonymous = graphene.Boolean(required=False)
        is_open = graphene.Boolean(required=False)
        is_actual = graphene.Boolean(required=False)

    survey = graphene.Field(lambda: Survey)
    message = graphene.String()

    @auth_required
    def mutate(self, info, logged_user_id, survey_id, **kwargs):
        survey = SurveyORM.get_by_id(survey_id)

        if not survey:
            raise GraphQLError("survey.does.notExist")

        update_fields = EditSurvey._get_update_fields(**kwargs)
        survey.update(**update_fields)

        resolved_survey = Survey(
            id=survey.id,
            owner_id=survey.owner_id,
            title=survey.title,
            description=survey.description,
            is_anonymous=survey.is_anonymous,
            is_actual=survey.is_actual
        )

        return EditSurvey(survey=resolved_survey, message="ok")

    @staticmethod
    def _get_update_fields(title, description, is_anonymous, is_actual, is_open, **kwargs):
        update_fields = {}
        if title:
            update_fields['title'] = title

        if description:
            update_fields['description'] = description

        if is_anonymous is not None:
            update_fields['is_anonymous'] = is_anonymous

        if is_open is not None:
            update_fields['is_open'] = is_open

        if is_actual is not None:
            update_fields['is_actual'] = is_actual

        return update_fields


class CreateQuestion(graphene.Mutation):
    class Arguments:
        survey_id = graphene.ID()
        payload = graphene.String()
        allow_multiple_answer = graphene.Boolean()
        options = graphene.List(OptionInput)

    question = graphene.Field(lambda: Question)
    message = graphene.String()

    @auth_required
    def mutate(self, info, survey_id, payload: str, options: list = None, allow_multiple_answer=False, *args, **kwargs):
        new_question: QuestionORM = QuestionORM.create(
            survey_id=survey_id,
            allow_multiple_answer=allow_multiple_answer,
            payload=payload
        )

        option_list_field = []
        for option in options or []:
            new_option: OptionORM = OptionORM.create(
                question_id=new_question.id,
                payload=option.payload,
            )
            option_list_field.append(
                Option(
                    id=new_option.id,
                    question_id=new_option.question_id,
                    payload=new_option.payload
                )
            )

        question = Question(
            id=new_question.id,
            survey_id=new_question.survey_id,
            allow_multiple_answer=allow_multiple_answer,
            payload=payload,
        )

        return CreateQuestion(question=question, message='ok')


class EditQuestion(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        payload = graphene.String()
        allow_multiple_answer = graphene.Boolean()
        options = graphene.List(OptionInput)

    message = graphene.String()

    @auth_required
    def mutate(self, info, id, payload, allow_multiple_answer, options, *args, **kwargs):
        question = QuestionORM.get_by_id(id)
        if not question:
            raise GraphQLError('question.doesNotExist')

        question.update(
            payload=payload,
            allow_multiple_answer=allow_multiple_answer
        )
        print(options)
        EditQuestion._update_options(options)

        return EditQuestion(message='ok')

    @staticmethod
    def _update_options(options):
        for option in options:
            option_orm = OptionORM.get_by_id(option.id)
            if not option_orm:
                raise GraphQLError('option.doesNotExist')

            option_orm.update(**option.__dict__)


class CreateOption(graphene.Mutation):
    class Arguments:
        question_id = graphene.ID()
        payload = graphene.String()

    message = graphene.String()
    option = graphene.Field(lambda: Option)

    @auth_required
    def mutate(self, info, question_id, payload, *args, **kwargs):
        option_orm = OptionORM.create(
            question_id=question_id,
            payload=payload
        )

        option = Option(
            id=option_orm.id,
            question_id=option_orm.question_id,
            payload=option_orm.payload
        )

        return CreateOption(message='ok', option=option)


class SaveUserAnswer(graphene.Mutation):
    class Arguments:
        question_id = graphene.ID()
        options = graphene.List(graphene.ID)

    message = graphene.String()

    @auth_required
    def mutate(self, info, logged_user_id, question_id, options, *args, **kwargs):
        UserAnswer.delete_user_answers_for_question(question_id, user_id=logged_user_id)

        for option_id in options:
            UserAnswer.create(
                user_id=logged_user_id,
                option_id=option_id
            )

        return SaveUserAnswer(message='ok')
