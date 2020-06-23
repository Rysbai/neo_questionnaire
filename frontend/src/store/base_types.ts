import {RootState} from "./index";


export interface BasicFailAction {
  type: string,
  error: Error | null
}

export type GetState = () => RootState
export type Dispatch = (config: any) => void