import { RoleType } from "../Interface/IUser";
import { User } from "../User.model";
export class UserBuilder {
  user_id: number;
  private username!: string;
  private email!: string;
  private password_hash!: string;
  private role!: RoleType;
  private created_at?: Date;
  private profile_photo_url?: string | null;
  private DOB?: Date | null;
  private location?: string | null;
  private first_name!: string;
  private last_name!: string;
  setUsername(username: string): this {
    this.username = username;
    return this;
  }

  setEmail(email: string): this {
    this.email = email;
    return this;
  }

  setPasswordHash(hash: string): this {
    this.password_hash = hash;
    return this;
  }

  setRole(role: RoleType): this {
    this.role = role;
    return this;
  }

  setCreatedAt(date: Date): this {
    this.created_at = date;
    return this;
  }

  setProfilePhotoUrl(url?: string | null): this {
    this.profile_photo_url = url;
    return this;
  }

  setDOB(dob?: Date | null): this {
    this.DOB = dob;
    return this;
  }

  setLocation(location?: string | null): this {
    this.location = location;
    return this;
  }
  setFirstName(first_name: string): this {
    this.first_name = first_name;
    return this;
  }
  setLastName(last_name: string): this {
    this.last_name = last_name;
    return this;
  }

  build(): User {
    if (!this.username || !this.email || !this.password_hash || !this.role) {
      throw new Error("missing required fields!");
    }

    return new User(
      this.username,
      this.email,
      this.password_hash,
      this.role,
      this.created_at || new Date(),
      this.first_name,
      this.last_name,
      this.profile_photo_url,
      this.DOB,
      this.location
    );
  }
}
