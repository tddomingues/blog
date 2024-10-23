export default interface UserProps {
  id: string;
  name: string;
  image: string | null;
  emailVerified: null | undefined | Date;
  email: string;
  password: string;
  role: string;
  create_at: Date;
}
