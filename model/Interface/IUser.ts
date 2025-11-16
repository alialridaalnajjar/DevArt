export enum RoleType {
  USER = "student",
  ADMIN = "admin",
}

export interface IUser {
  username: string;
  email: string;
  password_hash: string;
  role: RoleType;
  created_at: Date;
  profile_photo_url?: string | null;
  DOB?: Date | null;
  location?: string | null;
  first_name: string ;
  last_name: string ;
}