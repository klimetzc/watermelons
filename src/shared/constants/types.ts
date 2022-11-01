export default interface UserData {
  name: string | null;
  surname: string | null;
  family: string | null;
  address: string | null;
  phone: string | number | null;
}

export interface IUserData {
  name: string;
  surname: string;
  family: string;
  address: string;
  phone: number | string;
}
