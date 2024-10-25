import { iUserRegData } from "./user-reg-data"

export interface iAuthResponse {
  accessToken:string
  user: iUserRegData
}
