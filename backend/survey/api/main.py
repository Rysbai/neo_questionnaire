import graphene
from graphql import GraphQLError

from survey.models.survey import Questionnaire
from survey.api.survey import CreateSurvey, Survey, EditSurvey
from survey.api.user import User, Authorize
from survey.services.auth import auth_required


class Mutations(graphene.ObjectType):
    auth = Authorize.Field()
    create_survey = CreateSurvey.Field()
    edit_survey = EditSurvey.Field()


class Query(graphene.ObjectType):
    survey = graphene.Field(Survey, id=graphene.ID(), token=graphene.String())
    user = graphene.Field(User)

    @auth_required
    def resolve_survey(self, info, id, *args, **kwargs):
        survey = Questionnaire.get_by_id(id)

        if not survey:
            raise GraphQLError("survey.does.not.exist")

        return Survey(
            id=survey.id,
            title=survey.title,
            description=survey.description,
            is_anonymous=survey.is_anonymous,
            is_actual=survey.is_actual
        )


schema = graphene.Schema(query=Query, mutation=Mutations)
