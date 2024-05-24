export interface Comment {
    blogId: number;
    userId: number;
    userName: String;
    content: string; // Add this line to include content
    date: string;
    gender:string;
    translatedContent?: string; 
  }
  