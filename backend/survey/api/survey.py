import graphene as graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

from survey.models.survey import Questionnaire
from survey.services.auth import auth_required


class Survey(SQLAlchemyObjectType):
    class Meta:
        model = Questionnaire

    def resolve_id(parent, info):
        return parent.id


class CreateSurvey(graphene.Mutation):
    class Arguments:
        token = graphene.String()
        title = graphene.String()
        description = graphene.String()
        is_anonymous = graphene.Boolean(required=False)
        start_at = graphene.DateTime(required=False)
        end_at = graphene.DateTime(required=False)

    survey = graphene.Field(lambda: Survey)
    message = graphene.String()

    @auth_required
    def mutate(self, info, logged_user_id, title, description, is_anonymous, start_at, end_at, *args, **kwargs):
        new_survey = Questionnaire.create(
            owner_id=logged_user_id,
            title=title,
            description=description,
            is_anonymous=is_anonymous,
            start_at=start_at,
            end_at=end_at
        )
        survey = Survey(
            id=new_survey.id,
            owner_id=new_survey.owner_id,
            title=new_survey.title,
            description=new_survey.description,
            is_anonymous=new_survey.is_anonymous,
            start_at=new_survey.start_at,
            end_at=new_survey.end_at
        )
        return CreateSurvey(survey=survey, message='ok')
