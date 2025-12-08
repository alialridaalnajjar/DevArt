import { IVideo } from "./Interface/IVideo";

export class Video implements IVideo {
  video_id: number;
  module_id: number;
  title: string;
  video_url: string;
  manifest_url?: string | null;
  duration_seconds: number;
  genre: string;
  author?: string;

  constructor(
    video_id: number,
    module_id: number,
    title: string,
    video_url: string,
    duration_seconds: number,
    genre: string,
    manifest_url?: string | null,
    author?: string
  ) {
    this.video_id = video_id;
    this.module_id = module_id;
    this.title = title;
    this.video_url = video_url;
    this.duration_seconds = duration_seconds;
    this.manifest_url = manifest_url;
    this.genre = genre;
    this.author = author;
  }
}
