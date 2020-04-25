import graphene as graphene
from graphene_sqlalchemy import SQLAlchemyObjectType

from questionaire.models.survey import Questionnaire


class Survey(SQLAlchemyObjectType):
    class Meta:
        model = Questionnaire

    def resolve_id(parent, info):
        return parent.id


class CreateSurvey(graphene.Mutation):
    class Arguments:
        title = graphene.String()
        description = graphene.String()
        is_anonymous = graphene.Boolean(required=False)
        start_at = graphene.DateTime(required=False)
        end_at = graphene.DateTime(required=False)

    survey = graphene.Field(lambda: Survey)
    message = graphene.String()

    def mutate(self, info, title, description, is_anonymous=True, start_at="", end_at="", *args, **kwargs):
        new_survey = Questionnaire.create(
            title=title,
            description=description,
            is_anonymous=is_anonymous,
            start_at=start_at,
            end_at=end_at
        )
        survey = Survey(**new_survey.__dict__)
        return CreateSurvey(survey=survey, message='ok')
