export type UserRole = "technician" | "manager" | "cleaner";

export interface UserContext {
  userId: string;
  role: UserRole;
  name: string;
}
