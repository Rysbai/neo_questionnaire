import {Survey} from "./types";
import {gqClient} from "./clients";


export async function createSurvey(survey: Survey, token: string) : Promise<Survey> {
  const query = `
    mutation CreateSurvey($token: String! $title: String!, $description: String!, $isAnonymous: Boolean!) {
      createSurvey(token: $token, title: $title, description: $description, isAnonymous: $isAnonymous){
        message,
        survey {
          id,
          title,
          description,
          isAnonymous,
          isActual
        }
      }
    }
  `;

  const response = await gqClient.request(query, {...survey, token: token});

  return {
    ...response.createSurvey.survey
  }
}


export async function retrieveSurvey(surveyId: string, token: string | null) {
  const query = `
    query RetrieveUser($surveyId: ID!, $token: String!) {
      survey(id: $surveyId, token: $token) {
        id,
        title,
        description,
        isAnonymous,
        isActual,
        questions {
          id,
          surveyId,
          position,
          payload,
          allowMultipleAnswer,
          options {
            id,
            questionId,
            payload
          }
        }
      }
    }
  `;

  const response = await gqClient.request(query, {surveyId, token});

  return {
    ...response.survey
  }
}


export async function editSurvey(survey: Survey, token: string | null): Promise<string> {
    const query = `
    mutation EditSurvey(
      $id: ID!, 
      $token: String!, 
      $title: String!, 
      $description: String!, 
      $isAnonymous: Boolean!, 
      $isActual: Boolean!  
    ){
      editSurvey(
        surveyId: $id, 
        token: $token, 
        title: $title, 
        description: $description, 
        isAnonymous: $isAnonymous, 
        isActual: $isActual
      ){
        message
      }
    }
  `;

  const response = await gqClient.request(query, {...survey, token});

  if (response.editSurvey && response.editSurvey.message) return response.editSurvey.message;

  throw "Проблема при сохранении изменений."
}