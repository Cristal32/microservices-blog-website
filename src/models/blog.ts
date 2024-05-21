export interface Blog {
    blogId: number;  // Ensure blogId is required and cannot be undefined
    title: string;
    country: string;
    description: string;
    image: FormData;
    date: string;
    likes: number;
    liked?: boolean;
    latitude: number;
    longitude: number;
  }
  