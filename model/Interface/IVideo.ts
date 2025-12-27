export interface IVideo {
  video_id: number;
  module: string;
  title: string;  
  video_url: string;
  manifest_url?: string | null;
  duration_seconds: number;
  genre: string;
  language?: string;
  author?: string; 
}
