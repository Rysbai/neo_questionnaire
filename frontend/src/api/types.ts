export interface User {
  id: string | number | null,
  name: string,
}


export interface UserWithToken {
  user: User,
  token: string
}


export interface Survey {
  id: string | number | undefined,
  title: string,
  description: string,
  isAnonymous: boolean,
  isActual: boolean
  questions: Array<Question>
}


export interface Question {
  id: string | number | undefined,
  payload: string,
  surveyId: string | number | null,
  allowMultipleAnswer: boolean,
  options: Array<Option>
}


export interface Option {
  id: string | number | null,
  questionId: string | number | null,
  payload: string
}
