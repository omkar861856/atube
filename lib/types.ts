// Eporner API Types

export interface EpornerThumb {
  size: 'small' | 'medium' | 'big';
  width: number;
  height: number;
  src: string;
}

export interface EpornerVideo {
  id: string;
  title: string;
  keywords: string;
  views: number;
  rate: string;
  url: string;
  added: string;
  length_sec: number;
  length_min: string;
  embed: string;
  default_thumb: EpornerThumb;
  thumbs: EpornerThumb[];
}

export interface EpornerSearchResponse {
  count: number;
  start: number;
  per_page: number;
  page: number;
  time_ms?: number;
  total_count: number;
  total_pages: number;
  videos: EpornerVideo[];
}

export type SortOrder =
  | 'latest'
  | 'longest'
  | 'shortest'
  | 'top-rated'
  | 'most-popular'
  | 'top-weekly'
  | 'top-monthly';
