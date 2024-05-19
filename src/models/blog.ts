import { user } from '../models/user';

export interface Blog{
    blogId?: number;
    title : string;
    country : string;
    description : string;
    image:FormData
    date:string;
    likes: number;  // Ajoutez cette ligne
    liked?: boolean; // Ajoutez cette ligne (optionnelle)

}