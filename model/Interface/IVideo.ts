export interface IVideo {
  video_id: number;
  module_id: number;
  title: string;  
  video_url: string;
  manifest_url?: string | null;
  duration_seconds: number;
  genre: string;
  author?: string; 
}
