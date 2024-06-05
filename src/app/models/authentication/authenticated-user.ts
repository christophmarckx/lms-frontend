export interface AuthenticatedUser {
  id: string,
  email: string,
  displayName: string,
  role: UserRole;
}

export enum UserRole {
  COACH = "COACH",
  STUDENT = "STUDENT"
}
