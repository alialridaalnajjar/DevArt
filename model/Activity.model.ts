import { IActivity } from "./Interface/IActivity";

export class Activity implements IActivity {
  activity_id: number;
  dod: Date;
  title: string;
  user_id: number;

  constructor(activity_id: number, dod: Date, title: string, user_id: number) {
    this.activity_id = activity_id;
    this.dod = dod;
    this.title = title;
    this.user_id = user_id;
  }
}
