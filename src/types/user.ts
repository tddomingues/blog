export default interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: "admin" | "user";
  active?: boolean;
  create_at?: Date;
}
