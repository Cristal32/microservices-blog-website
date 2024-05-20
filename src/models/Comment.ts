export interface Comment {
    commentId: number;  // Unique identifier for each comment
    blogId: number;     // Foreign key to the blog
    userId: number;     // Foreign key to the user who made the comment
    text: string;       // The content of the comment
    date: string;       // The date when the comment was made
    userName: string;   // The name of the user who made the comment
  }
  