export default interface UserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: string;
  active?: boolean;
  create_at?: Date;
}
