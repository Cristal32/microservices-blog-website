import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { user } from '../models/user';
import {Blog} from '../models/blog';
import { Comment } from '../models/Comment';
import {BlogResponse} from '../models/blogResponse';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private http: HttpClient,private zone:NgZone) { }
  public getProfile(id:number):Observable<user>{
   
    return this.http.get<user>(`http://localhost:8222/users/profile/${id}`)
}

 public editProfile(u: user,id:number) {


  return this.http.put<user>(`http://localhost:8222/users/edit/${id}`, u);
}
public addUser(u:user){
  return this.http.post<user>(`http://localhost:8222/users/add`, u);
}
public authentifier(email:string,pass:string){
  return this.http.get<user>(`http://localhost:8222/users/authentifier/${email}/${pass}`);
}

public addBlog(blog: FormData, id: number ): Observable<any> {

  return this.http.post<Blog>(`http://localhost:8222/blogs/addBlog/${id}`, blog);
}

public getBlogsByUserId(userId: number): Observable<Blog[]> {
  return this.http.get<Blog[]>(`http://localhost:8222/blogs/user/${userId}`);
}

public getAllBlogs(): Observable<BlogResponse[]> {
  return this.http.get<BlogResponse[]>(`http://localhost:8222/blogs/all`);
}

public getBlogsByCountry(country: string): Observable<BlogResponse[]> {
  // Use template literals to include the country parameter in the URL
  return this.http.get<BlogResponse[]>(`http://localhost:8222/blogs/country/${country}`);
}





public likeBlog(id: number): Observable<Blog> {
  return this.http.post<Blog>(`http://localhost:8222/blogs/${id}/like`, {});
}

public unlikeBlog(id: number): Observable<Blog> {
  return this.http.post<Blog>(`http://localhost:8222/blogs/${id}/unlike`, {});
}

getBlogById(blogid: number): Observable<Blog> {
  return this.http.get<Blog>(`http://localhost:8222/blogs/content/${blogid}`);
}




public getCommentsByBlogId(blogId: number): Observable<Comment[]> {
  return this.http.get<Comment[]>(`http://localhost:8222/blogs/comments/${blogId}`).pipe(
    catchError(this.handleError)
  );
}

createComment(blogId: number, userId: number, comment: Comment): Observable<Comment> {
  return this.http.post<Comment>(`http://localhost:8222/blogs/comments/${blogId}/${userId}`, comment).pipe(
    catchError(this.handleError)
  );
}

private handleError(error: any): Observable<never> {
  console.error('An error occurred:', error);
  return throwError('Something bad happened; please try again later.');
}


}
