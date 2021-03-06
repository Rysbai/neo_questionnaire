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
  code: string,
  isAnonymous: boolean,
  isActual: boolean,
  isOpen: boolean,
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


export interface OptionResult extends Option {
  answers: number
}

export interface QuestionResult {
  id: string,
  payload: string,
  optionResults: Array<OptionResult>
}