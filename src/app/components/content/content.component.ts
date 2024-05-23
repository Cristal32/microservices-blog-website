import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../../models/blog';
import { RestapiService } from '../../../services/restapi.service';
import { TranslationService } from '../../../services/translation.service';
import { Comment } from '../../../models/Comment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  blog: Blog = {} as Blog;
  id: number = 0;
  blogid: number = 0;
  Name: string = '';
  userGender: string = '';
  comments: Comment[] = [];
  newComment: Comment = {
    blogId: 0,
    userId: 0,
    userName: '',
    content: '',
    gender: '',
    date: new Date().toISOString()
  };

  translatedTitle: string = '';
  translatedCountry: string = '';
  translatedDescription: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RestapiService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.id = Number(sessionStorage.getItem('uId'));
    this.userGender = String(sessionStorage.getItem('userGender'));
    this.Name = String(sessionStorage.getItem('uName'));
    this.blogid = Number(this.route.snapshot.paramMap.get('blogId'));
    this.newComment.userName = this.Name;
    this.newComment.blogId = this.blogid;
    this.newComment.userId = this.id;
    this.newComment.gender = this.userGender;
    this.getComments();
    this.getBlogById();
  }

  getBlogById(): void {
    this.service.getBlogById(this.blogid).subscribe(
      (data) => {
        this.blog = data;
        this.translateFields();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getComments(): void {
    this.service.getCommentsByBlogId(this.blogid).subscribe(
      (data: Comment[]) => {
        this.comments = data;
        this.translateComments();
      },
      (error) => {
        console.error('Error:', error);
        alert('Failed to load comments. Please try again later.');
      }
    );
  }

  submitComment(): void {
    if (this.newComment.content) {
      this.newComment.date = new Date().toISOString();  // Set current date as ISO string before submission
      this.service.addComment(this.newComment).subscribe({
        next: (comment) => {
          this.newComment.content = '';  // Clear the text area after submission
          this.newComment.date = new Date().toISOString();  // Reset date if needed after successful submission
          window.location.reload();
        },
        error: (error) => console.error('There was an error!', error)
      });
    } else {
      console.log('Comment content is empty');  // Debugging statement
    }
  }

  translateFields(): void {
    const userLanguage = navigator.language.split('-')[0];  // Get browser language

    this.translationService.translate(this.blog.title, userLanguage).subscribe({
      next: (translatedText: string) => this.translatedTitle = translatedText,
      error: (error: any) => console.error('Translation error for title:', error)
    });

    this.translationService.translate(this.blog.country, userLanguage).subscribe({
      next: (translatedText: string) => this.translatedCountry = translatedText,
      error: (error: any) => console.error('Translation error for country:', error)
    });

    this.translationService.translate(this.blog.description, userLanguage).subscribe({
      next: (translatedText: string) => this.translatedDescription = translatedText,
      error: (error: any) => console.error('Translation error for description:', error)
    });
  }

  translateComments(): void {
    const userLanguage = navigator.language.split('-')[0];  // Get browser language

    this.comments.forEach(comment => {
      this.translationService.translate(comment.content, userLanguage).subscribe({
        next: (translatedText: string) => comment.translatedContent = translatedText,
        error: (error: any) => console.error('Translation error for comment:', error)
      });
    });
  }

  getUserImage(gender: string): String {
    return Number(gender) === 1 ? '/assets/images/gar.png' : '/assets/images/fille.jpg';
  }
}
