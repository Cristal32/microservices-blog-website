import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../../models/blog';
import { RestapiService } from '../../services/restapi.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  blog: Blog = {} as Blog;
  id: number = 0;
  blogid: number = 0;

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
    this.blogid = Number(this.route.snapshot.paramMap.get('blogId'));

    this.getBlogById();
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
}
