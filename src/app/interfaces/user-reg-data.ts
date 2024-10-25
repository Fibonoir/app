import { iUserCredentials } from "./user-credentials";

export interface iUserRegData extends iUserCredentials{
  name: string;
  id?: string;
}
