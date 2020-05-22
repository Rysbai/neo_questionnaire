export interface User {
  id: string | number | null,
  name: string,
}


export interface UserWithToken {
  user: User,
  token: string
}


export interface Survey {
  id: string | number | null,
  title: string,
  description: string,
  isAnonymous: boolean,
  isActual: boolean
  questions: Array<Question>
}


export interface Question {
  id: string | number | null,
  payload: string,
  isMultipleChoice: boolean
  options: Array<Option>
}


export interface Option {
  id: string | number | null,
  questionId: string | number | null,
  payload: string
}
