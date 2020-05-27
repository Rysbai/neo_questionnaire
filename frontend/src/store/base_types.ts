import {RootState} from "./index";


export interface BasicFailAction {
  type: string,
  error: string
}

export type GetState = () => RootState