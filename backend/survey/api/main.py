import graphene
from graphql import GraphQLError

from survey.models.survey import Survey as SurveyORM
from survey.api.survey import CreateSurvey, EditSurvey, CreateQuestion, EditQuestion, CreateOption
from survey.api.types import Survey, User
from survey.api.user import Authorize
from survey.services.decorators import auth_required


class Mutations(graphene.ObjectType):
    auth = Authorize.Field()
    create_survey = CreateSurvey.Field()
    create_question = CreateQuestion.Field()
    create_option = CreateOption.Field()
    edit_survey = EditSurvey.Field()
    edit_question = EditQuestion.Field()


class Query(graphene.ObjectType):
    surveys = graphene.List(Survey, page=graphene.Int(), per_page=graphene.Int())
    survey = graphene.Field(Survey, id=graphene.ID())
    survey_by_code = graphene.Field(Survey, code=graphene.String())
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
            is_public=survey.is_public,
            is_actual=survey.is_actual
        )

    @auth_required
    def resolve_survey_by_code(self, info, code, **kwargs):
        survey = SurveyORM.query.filter(SurveyORM.code == code).first()

        if not survey:
            raise GraphQLError('survey.does.not.exists')

        return Survey(
            id=survey.id,
            owner_id=survey.owner_id,
            code=survey.code,
            title=survey.title,
            description=survey.description,
            is_anonymous=survey.is_anonymous,
            is_public=survey.is_public,
            is_actual=survey.is_actual
        )

    @auth_required
    def resolve_surveys(self, info, page=1, per_page=10, **kwargs):
        pagination = SurveyORM.query.filter(SurveyORM.is_actual == True).paginate(page=page, per_page=per_page)
        surveys = []
        for survey in pagination.items:
            surveys.append(
                Survey(
                    id=survey.id,
                    title=survey.title,
                    description=survey.description,
                    is_anonymous=survey.is_anonymous,
                    is_actual=survey.is_actual
                )
            )

        return surveys


schema = graphene.Schema(query=Query, mutation=Mutations)
