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
   
    return this.http.get<user>(`http://localhost:9091/user/profile/${id}`)
}

 public editProfile(u: user,id:number) {



  return this.http.put<void>(`http://localhost:9091/user/edit/${id}`, u);
}
public addUser(u:user){
  return this.http.post<user>(`http://localhost:9091/system/add`, u);
}
public authentifier(email:string,pass:string){
  return this.http.get<user>(`http://localhost:9091/system/authentifier/${email}/${pass}`);
}

public addBlog(blog: FormData, id: number ): Observable<any> {

  return this.http.post<Blog>(`http://localhost:9091/blogs/addBlog/${id}`, blog);
}

public getBlogsByUserId(userId: number): Observable<Blog[]> {
  return this.http.get<Blog[]>(`http://localhost:9091/blogs/user/${userId}`);
}

public getAllBlogs(): Observable<BlogResponse[]> {
  return this.http.get<BlogResponse[]>(`http://localhost:9091/blogs/all`);
}

public getBlogsByCountry(country: string): Observable<BlogResponse[]> {
  // Use template literals to include the country parameter in the URL
  return this.http.get<BlogResponse[]>(`http://localhost:9091/blogs/country/${country}`);
}



getBlogById(blogid: number): Observable<Blog> {
  return this.http.get<Blog>(`http://localhost:9091/blogs/content/${blogid}`);
}

}
