import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../models/blog';
import { RestapiService } from '../../services/restapi.service';
import { TranslationService } from '../../services/translation.service';
import { Comment } from '../../models/Comment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  blog: Blog = {} as Blog;
  id: number = 0;
  blogid: number = 0;
  comments: Comment[] = [];
  newComment: Comment = { text: '' } as Comment;

  translatedTitle: string = '';
  translatedCountry: string = '';
  translatedDescription: string = '';

  userGender: number = 0; // Add userGender

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: RestapiService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {
    this.id = Number(sessionStorage.getItem('uId'));
    this.userGender = Number(sessionStorage.getItem('userGender')); // Retrieve user gender
    this.blogid = Number(this.route.snapshot.paramMap.get('blogId'));

    this.getBlogById();
    this.getComments();
  }

  getBlogById(): void {
    this.service.getBlogById(this.blogid).subscribe(
      (data) => {
        this.blog = data;
        this.translateFields();
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  getComments(): void {
    this.service.getCommentsByBlogId(this.blogid).subscribe(
      (data: Comment[]) => {
        this.comments = data;
      },
      (error) => {
        console.error('Error:', error);
        alert('Failed to load comments. Please try again later.');
      }
    );
  }

  submitComment(): void {
    if (!this.newComment.text) return;

    this.service.createComment(this.blogid, this.id, this.newComment).subscribe(
      (data: Comment) => {
        this.comments.push(data);
        this.newComment = { text: '' } as Comment;
      },
      (error) => {
        console.error('Error:', error);
        alert('Failed to submit comment. Please try again later.');
      }
    );
  }

  translateFields(): void {
    const userLanguage = navigator.language.split('-')[0]; // Get browser language

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

  getUserImage(): string {
    return this.userGender === 1
      ? 'https://bootdey.com/img/Content/avatar/avatar1.png' // Female avatar
      : 'https://bootdey.com/img/Content/avatar/avatar2.png'; // Male avatar
  }
}
