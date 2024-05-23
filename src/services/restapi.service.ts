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
  private apiGatewayUrl = 'http://localhost:8222';
  private apiUserUrl = 'http://localhost:9098';
  private apiBlogUrl = 'http://localhost:9097';


  constructor(private http: HttpClient,private zone:NgZone) { }
  public getProfile(id:number):Observable<user>{
    return this.http.get<user>(`${this.apiUserUrl}/users/profile/${id}`)
}

 public editProfile(u: user,id:number) {
  return this.http.put<user>(`${this.apiUserUrl}/users/edit/${id}`, u);
}

public addUser(u:user){
  return this.http.post<user>(`${this.apiUserUrl}/users/add`, u);
}

public authentifier(email:string,pass:string){
  return this.http.get<user>(`${this.apiUserUrl}/users/authentifier/${email}/${pass}`);
}

// Blog services

public addBlog(blog: FormData, id: number ): Observable<any> {
  return this.http.post<Blog>(`${this.apiBlogUrl}/blogs/addBlog/${id}`, blog);
}

public getBlogsByUserId(userId: number): Observable<Blog[]> {
  return this.http.get<Blog[]>(`${this.apiBlogUrl}/blogs/user/${userId}`);
}

public getAllBlogs(): Observable<BlogResponse[]> {
  return this.http.get<BlogResponse[]>(`${this.apiBlogUrl}/blogs/all`);
}

public getBlogsByCountry(country: string): Observable<BlogResponse[]> {
  return this.http.get<BlogResponse[]>(`${this.apiBlogUrl}/blogs/country/${country}`);
}

public likeBlog(id: number): Observable<Blog> {
  return this.http.post<Blog>(`${this.apiBlogUrl}/blogs/${id}/like`, {});
}

public unlikeBlog(id: number): Observable<Blog> {
  return this.http.post<Blog>(`${this.apiBlogUrl}/blogs/${id}/unlike`, {});
}

getBlogById(blogid: number): Observable<Blog> {
  return this.http.get<Blog>(`${this.apiBlogUrl}/blogs/content/${blogid}`);
}

// Comments services

public getCommentsByBlogId(blogId: number): Observable<Comment[]> {
  return this.http.get<Comment[]>(`${this.apiGatewayUrl}/comments/getComments/${blogId}`).pipe(
    catchError(this.handleError)
  );
}

addComment(comment: Comment): Observable<Comment> {
  return this.http.post<Comment>(`${this.apiGatewayUrl}/comments/addComment`, comment);
}

private handleError(error: any): Observable<never> {
  console.error('An error occurred:', error);
  return throwError('Something bad happened; please try again later.');
}


}
