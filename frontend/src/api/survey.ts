import {Option, Question, Survey} from "./types";
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

  const response = await authorizedGqClient().request(query, {...survey});

  return {
    ...response.createSurvey.survey
  }
}


export async function retrieveSurvey(surveyId: string) {
  const query = `
    query RetrieveSurvey($surveyId: ID!) {
      survey(id: $surveyId) {
        id,
        title,
        description,
        isAnonymous,
        isActual,
        isOpen,
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

  const response = await authorizedGqClient().request(query, {surveyId});

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
      $isActual: Boolean!,
      $isOpen: Boolean!
    ){
      editSurvey(
        surveyId: $id, 
        title: $title, 
        description: $description, 
        isAnonymous: $isAnonymous, 
        isActual: $isActual,
        isOpen: $isOpen
      ){
        message
      }
    }
  `;

  const response = await authorizedGqClient().request(query, {...survey});

  if (response.editSurvey && response.editSurvey.message) return response.editSurvey.message;

  throw "Проблема при сохранении изменений."
}


export async function createNewQuestion(question: Question): Promise<Question> {
  const query = `
  mutation CreateNewQuestion(
    $surveyId: ID!,
    $payload: String!,
    $allowMultipleAnswer: Boolean!,
    $options: [OptionInput]
  ){ 
      createQuestion(
        surveyId: $surveyId,
        payload: $payload,
        allowMultipleAnswer: $allowMultipleAnswer,
        options: $options
      ) {
        message,
        question {
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

  const response = await authorizedGqClient().request(query, {...question});

  if (response.createQuestion && response.createQuestion.question) return response.createQuestion.question;

  throw 'Проблема при создании вопроса.'
}


export async function editQuestion(question: Question): Promise<string> {
  const query = `
    mutation EditQuestion(
      $id: ID!,
      $payload: String!,
      $allowMultipleAnswer: Boolean!,
      $options: [OptionInput]
    ) {
      editQuestion (
        id: $id,
        payload: $payload,
        allowMultipleAnswer: $allowMultipleAnswer,
        options: $options
      ) {
          message
        }
      }
  `;

  const response = await authorizedGqClient().request(query, question);

  if (response.editQuestion && response.editQuestion && response.editQuestion.message) return response.editQuestion.message;

  throw 'Проблема при сохранении изменений вопроса'
}


export async function createNewOption(option: Option): Promise<Option> {
  const query = `
    mutation CreateNewOption(
      $questionId: ID!,
      $payload: String!
    ) {
      createOption(
        questionId: $questionId,
        payload: $payload
       ) {
        message,
        option {
          id,
          questionId,
          payload
        }
      }
    }
  `;

  const response = await authorizedGqClient().request(query, option);

  if (response.createOption && response.createOption.option) return response.createOption.option;

  throw 'Проблема при добавлении ответа'
}