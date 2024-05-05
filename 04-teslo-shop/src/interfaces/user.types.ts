export interface User {
  id: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  name: string;
  password: string;
  role: Role;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}
