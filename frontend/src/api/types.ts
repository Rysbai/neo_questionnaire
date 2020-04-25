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
  startAt: string | Date,
  endAt: string | Date,
}