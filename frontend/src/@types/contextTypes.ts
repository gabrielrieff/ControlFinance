export type userProps = {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  photo?: string;
  admin?: number;
  password?: string;
  updated_at?: Date;
  created_at?: Date;
};

export type signInProps = {
  email: string;
  password: string;
};
