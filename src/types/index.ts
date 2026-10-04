export type ToolTab = 'all' | 'video' | 'photo' | 'reel' | 'story' | 'igtv' | 'carousel';

export interface MediaOption {
  type: 'video' | 'photo';
  url: string;
  thumbnail: string;
  quality?: string;
  width?: number;
  height?: number;
  downloadUrl: string;
}

export interface ResolveResult {
  success: boolean;
  type: 'reel' | 'video' | 'photo' | 'carousel' | 'story' | 'igtv';
  shortcode: string;
  caption: string;
  author: {
    username: string;
    fullName: string;
    avatar: string;
    verified: boolean;
  };
  metrics?: {
    likes?: number;
    views?: number;
    comments?: number;
  };
  duration?: string;
  media: MediaOption[];
  audio?: {
    title: string;
    artist: string;
    url: string;
    downloadUrl: string;
  };
  error?: string;
}

export interface SampleLink {
  label: string;
  type: ToolTab;
  url: string;
  description: string;
}
