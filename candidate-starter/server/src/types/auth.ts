export type UserRole = "technician" | "manager";

export interface UserContext {
  userId: string;
  role: UserRole;
  name: string;
}
