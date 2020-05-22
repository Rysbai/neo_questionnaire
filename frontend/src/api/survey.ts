import {Survey} from "./types";
import {authorizedGqClient} from "./clients";


export async function createSurvey(survey: Survey) : Promise<Survey> {
  const query = `
    mutation CreateSurvey($title: String!, $description: String!, $isAnonymous: Boolean!) {
      createSurvey(title: $title, description: $description, isAnonymous: $isAnonymous){
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

  const response = await authorizedGqClient.request(query, {...survey});

  return {
    ...response.createSurvey.survey
  }
}


export async function retrieveSurvey(surveyId: string) {
  const query = `
    query RetrieveUser($surveyId: ID!) {
      survey(id: $surveyId) {
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

  const response = await authorizedGqClient.request(query, {surveyId});

  return {
    ...response.survey
  }
}


export async function editSurvey(survey: Survey): Promise<string> {
    const query = `
    mutation EditSurvey(
      $id: ID!, 
      $title: String!, 
      $description: String!, 
      $isAnonymous: Boolean!, 
      $isActual: Boolean!  
    ){
      editSurvey(
        surveyId: $id, 
        title: $title, 
        description: $description, 
        isAnonymous: $isAnonymous, 
        isActual: $isActual
      ){
        message
      }
    }
  `;

  const response = await authorizedGqClient.request(query, {...survey});

  if (response.editSurvey && response.editSurvey.message) return response.editSurvey.message;

  throw "Проблема при сохранении изменений."
}