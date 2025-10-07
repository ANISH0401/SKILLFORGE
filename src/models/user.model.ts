export type Role = 'Student' | 'Instructor' | 'Admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}
