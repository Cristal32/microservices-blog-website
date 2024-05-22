import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogResponse } from '../../../models/blogResponse';
import { RestapiService } from '../../../services/restapi.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../../services/translation.service';
import { Blog } from '../../../models/blog';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  constructor(
    private router: Router,
    private service: RestapiService,
    private translate: TranslateService,
    private translationService: TranslationService
  ) {
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    if (browserLang && browserLang.match(/en|fr/)) {
      this.translate.use(browserLang);
    } else {
      this.translate.use('en');
    }
  }

  id: number = 0;
  selectedBlog: BlogResponse | null = null;
  translatedBlogs: { [key: number]: { title: string, description: string } } = {};
  blogs: BlogResponse[] = [];

  ngOnInit() {
    this.id = Number(sessionStorage.getItem('uId'));
    this.getAllBlogs();
  }

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  showBlogDetail(blogResponse: BlogResponse): void {
    if (blogResponse?.blog?.blogId) {
      this.router.navigate(['/content', blogResponse.blog.blogId]);
    } else {
      console.error('blogResponse.blog.blogId is undefined or null');
    }
  }

  countries: string[] = [
    'France', 'Afghanistan', 'Albanie', 'Algerie', 'Allemagne', 'Andorre', 'Angola', 'Anguilla', 'Antarctique', 'Antigua_et_Barbuda',
    'Yemen', 'Yougoslavie', 'Zambie', 'Zimbabwe'
  ];

  selectedCountry: string = '';

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.getBlogsByCountry(this.selectedCountry);
    }
  }

  translateBlogs(): void {
    const userLanguage = this.translate.currentLang;
    console.log('Current user language:', userLanguage); // Debug log
  
    this.blogs.forEach(blogResponse => {
      const blogId = blogResponse.blog.blogId;
      console.log('Processing blog ID:', blogId); // Debug log
  
      if (blogId !== undefined) {
        this.translationService.translate(blogResponse.blog.title, userLanguage).subscribe(
          (translatedTitle: string) => {
            console.log(`Translated title for blog ID ${blogId}:`, translatedTitle); // Debugging log
            this.translationService.translate(blogResponse.blog.description, userLanguage).subscribe(
              (translatedDescription: string) => {
                console.log(`Translated description for blog ID ${blogId}:`, translatedDescription); // Debugging log
                this.translatedBlogs[blogId] = {
                  title: translatedTitle,
                  description: translatedDescription
                };
              },
              error => console.log('Error translating description:', error)
            );
          },
          error => console.log('Error translating title:', error)
        );
      }
    });
  }
  
  

  getBlogsByCountry(country: string): void {
    this.service.getBlogsByCountry(country).subscribe(
      blogs => {
        this.blogs = blogs.map(blog => ({
          ...blog,
          imagePath: blog.gender === '0' ? '/assets/images/fille.jpg' : '/assets/images/gar.png'
        }));
        this.translateBlogs();
      },
      error => {
        console.error('Error fetching blogs:', error);
      }
    );
  }

  getAllBlogs(): void {
    this.service.getAllBlogs().subscribe(
      blogs => {
        this.blogs = blogs.map(blog => ({
          ...blog,
          imagePath: blog.gender === '0' ? '/assets/images/fille.jpg' : '/assets/images/gar.png'
        }));
        this.translateBlogs();
      },
      error => {
        console.error('Error fetching blogs:', error);
      }
    );
  }


  toggleLike(blogResponse: BlogResponse, event: Event): void {
    event.stopPropagation(); // Prevent event propagation to parent elements
    if (blogResponse.blog.blogId !== undefined) {
      if (!blogResponse.blog.liked) {
        this.service.likeBlog(blogResponse.blog.blogId).subscribe(
          (updatedBlog: Blog) => {
            blogResponse.blog.likes = updatedBlog.likes;
            blogResponse.blog.liked = true;
          },
          (error) => {
            console.error('Error liking blog:', error);
          }
        );
      } else {
        this.service.unlikeBlog(blogResponse.blog.blogId).subscribe(
          (updatedBlog: Blog) => {
            blogResponse.blog.likes = updatedBlog.likes;
            blogResponse.blog.liked = false;
          },
          (error) => {
            console.error('Error unliking blog:', error);
          }
        );
      }
    }
  }
}
