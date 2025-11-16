import { IUser, RoleType } from "./Interface/IUser";

export class User implements IUser {
  user_id: number;
  username: string;
  email: string;
  password_hash: string;
  role: RoleType;
  created_at: Date;
  profile_photo_url?: string | null;
  DOB?: Date | null;
  location?: string | null;
  first_name: string;
  last_name: string;

  constructor(
    username: string,
    email: string,
    password_hash: string,
    role: RoleType,
    created_at: Date,
    first_name: string,
    last_name: string,
    profile_photo_url?: string | null,
    DOB?: Date | null,
    location?: string | null
  ) {
    this.username = username;
    this.email = email;
    this.password_hash = password_hash;
    this.role = role;
    this.created_at = created_at;
    this.profile_photo_url = profile_photo_url;
    this.DOB = DOB;
    this.location = location;
    this.first_name = first_name;
    this.last_name = last_name;
  }
}
