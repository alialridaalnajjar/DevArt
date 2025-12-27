import { IVideo } from "./Interface/IVideo";

export class Video implements IVideo {
  video_id: number;
  module: string;
  title: string;
  video_url: string;
  manifest_url?: string | null;
  duration_seconds: number;
  genre: string;
  author?: string;
  language?: string;

  constructor(
    video_id: number,
    module: string,
    title: string,
    video_url: string,
    duration_seconds: number,
    genre: string,
    manifest_url?: string | null,
    author?: string,
    language?: string
  ) {
    this.video_id = video_id;
    this.module = module;
    this.title = title;
    this.video_url = video_url;
    this.duration_seconds = duration_seconds;
    this.manifest_url = manifest_url;
    this.genre = genre;
    this.author = author;
    this.language = language;
  }
}
