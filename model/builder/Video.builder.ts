import { Video } from "../Video.model";

export class VideoBuilder {
  private video_id?: number;
  private module!: string;
  private title!: string;
  private video_url!: string;
  private manifest_url?: string | null;
  private duration_seconds!: number;
  private genre!: string;
  private author?: string;
private language?: string;
  setVideoId(id: number): this {
    this.video_id = id;
    return this;
  }

  setModule(module: string): this {
    this.module = module;
    return this;
  }

  setTitle(title: string): this {
    this.title = title;
    return this;
  }

  setVideoUrl(url: string): this {
    this.video_url = url;
    return this;
  }

  setManifestUrl(url?: string | null): this {
    this.manifest_url = url;
    return this;
  }

  setDurationSeconds(duration: number): this {
    this.duration_seconds = duration;
    return this;
  }

  setGenre(genre: string): this {
    this.genre = genre;
    return this;
  }
  setAuthor(author: string): this {
    this.author = author;
    return this;
  }

  setLanguage(language: string): this {
    this.language = language;
    return this;
  }

  build(): Video {
    if (!this.module || !this.title || !this.video_url || !this.duration_seconds || !this.genre) {
      throw new Error("missing required fields!");
    }

    return new Video(
      this.video_id ?? 0,
      this.module,
      this.title,
      this.video_url,
      this.duration_seconds,
      this.manifest_url,
      this.genre,
      this.author,
      this.language
    );
  }
}
