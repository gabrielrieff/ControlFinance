export interface IAuthUserParams {
  id: string;
  lastName: string;
  email: string;
  token: string;
}

export interface AuthUserParams {
  email: string;
  password: string;
}

export interface IAuthUserRepository {
  authUser(params: AuthUserParams): Promise<IAuthUserParams>;
}
