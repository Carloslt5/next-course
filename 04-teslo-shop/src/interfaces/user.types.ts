export interface User {
  id: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  name: string;
  password: string;
  role: UserRole;
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}
