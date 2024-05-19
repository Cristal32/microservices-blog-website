import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../models/user';
import {Blog} from '../models/blog';
import {BlogResponse} from '../models/blogResponse';





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

}
