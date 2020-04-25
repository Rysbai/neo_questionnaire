import {Survey} from "./types";
import {authClient} from "./clients";

export async function createSurvey(survey: Survey, token: string) : Promise<Survey> {
  const query = `
    mutation CreateSurvey($token: String! $title: String!, $description: String!, $isAnonymous: Boolean!, $startAt: DateTime! $endAt: DateTime!) {
      createSurvey(token: $token, title: $title, description: $description, isAnonymous: $isAnonymous, startAt: $startAt, endAt: $endAt){
        message,
        survey {
          id
          title,
          description,
          isAnonymous,
          startAt,
          endAt
        }
      }
    }
  `;

  console.log({...survey, token: token});
  const response = await authClient.request(query, {...survey, token: token});

  return {
    ...response.createSurvey.survey
  }
}
