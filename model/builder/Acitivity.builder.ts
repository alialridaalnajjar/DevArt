import { Activity } from "../Activity.model";

export class ActivityBuilder {
  activity_id: number;
  dod: Date;
  title: string;
  user_id: number;

  setActivityId(activity_id: number): this {
    this.activity_id = activity_id;
    return this;
  }

  setDod(dod: Date): this {
    this.dod = dod;
    return this;
  }

  setTitle(title: string): this {
    this.title = title;
    return this;
  }

  setUserId(user_id: number): this {
    this.user_id = user_id;
    return this;
  }

  build(): Activity {
    if (!this.dod || !this.title || !this.user_id) {
      throw new Error("missing required fields!");
    }
    return new Activity(this.activity_id, this.dod, this.title, this.user_id);
  }
}
