import {Survey} from "./types";
import {authClient} from "./clients";

export async function createSurvey(survey: Survey) : Promise<Survey> {
  const query = `
    mutation CreateSurvey($title: String!, $description: String!, $isAnonymous: Boolean!, $startAt: DateTime! $endAt: DateTime!) {
      createSurvey(title: $title, description: $description, isAnonymous: $isAnonymous, startAt: $startAt, endAt: $endAt){
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

  const response = await authClient.request(query, survey);

  return {
    ...response.createSurvey
  }
}
