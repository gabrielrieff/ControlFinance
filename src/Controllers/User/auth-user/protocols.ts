export interface AuthUserParams {
  id: string;
  lastName: string;
  email: string;
  token: string;
}

export interface IAuthUserParams {
  email: string;
  password: string;
}

export interface IAuthUserRepository {
  authUser(params: IAuthUserParams): Promise<AuthUserParams>;
}
