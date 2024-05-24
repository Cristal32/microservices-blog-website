import {Blog} from './blog';

export interface BlogResponse {
    blog: Blog;
    name: string;
    gender: string;
    imagePath?: string;
  }