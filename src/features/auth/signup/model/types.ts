export enum Roles {
  CLIENT = 'CLIENT',
  SELLER = 'SELLER',
}

export interface ISignupFormData {
  email: string;
  password: string;
  role: Roles;
}
