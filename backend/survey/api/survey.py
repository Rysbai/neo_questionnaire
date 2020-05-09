import graphene as graphene
from graphene_sqlalchemy import SQLAlchemyObjectType
from graphql import GraphQLError

from survey.models.survey import Survey as SurveyORM
from survey.services.auth import auth_required


class Survey(SQLAlchemyObjectType):
    class Meta:
        model = SurveyORM

    def resolve_id(parent, info):
        return parent.id


class CreateSurvey(graphene.Mutation):
    class Arguments:
        token = graphene.String()
        title = graphene.String()
        description = graphene.String()
        is_anonymous = graphene.Boolean(required=False)

    survey = graphene.Field(lambda: Survey)
    message = graphene.String()

    @auth_required
    def mutate(self, info, logged_user_id, title, description, is_anonymous, *args, **kwargs):
        new_survey = SurveyORM.create(
            owner_id=logged_user_id,
            title=title,
            description=description,
            is_anonymous=is_anonymous,
            is_actual=False
        )
        survey = Survey(
            id=new_survey.id,
            owner_id=new_survey.owner_id,
            title=new_survey.title,
            description=new_survey.description,
            is_anonymous=new_survey.is_anonymous,
            is_actual=new_survey.is_actual
        )
        return CreateSurvey(survey=survey, message='ok')


class EditSurvey(graphene.Mutation):
    class Arguments:
        token = graphene.String()
        survey_id = graphene.ID()
        title = graphene.String(required=False)
        description = graphene.String(required=False)
        is_anonymous = graphene.Boolean(required=False)
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
    def _get_update_fields(title, description, is_anonymous, is_actual, **kwargs):
        update_fields = {}
        if title:
            update_fields['title'] = title

        if description:
            update_fields['description'] = description

        if is_anonymous:
            update_fields['is_anonymous'] = is_anonymous

        if is_actual:
            update_fields['is_actual'] = is_actual

        return update_fields
