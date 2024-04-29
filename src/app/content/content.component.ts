import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../models/blog';
import { RestapiService } from '../../services/restapi.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  blog: Blog ={ } as Blog
  id: number = 0;
 blogid:number=0


  constructor(private route: ActivatedRoute, private router: Router, private service: RestapiService) { }

  ngOnInit() {
    this.id = Number(sessionStorage.getItem('uId'));
    console.log(this.id);
    this.blogid = Number(this.route.snapshot.paramMap.get('blogId')); // Note the capital 'I' in 'blogId'
  console.log('Blog ID:', this.blogid); // Add this line for debugging
  
 
  this.getBlogById()

 
  }
getBlogById(): void {
  this.service.getBlogById(this.blogid).subscribe(
    (data) => {
      this.blog = data;
    },
    (error) => {
      console.log('Error:', error);
    }
  );
  }
}
