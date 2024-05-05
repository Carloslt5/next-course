export interface User {
  id: string;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  name: string;
  password: string;
  role: string;
}
