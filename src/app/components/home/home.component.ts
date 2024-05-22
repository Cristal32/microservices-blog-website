import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router'; // Import Router
import { EditComponent } from '../edit/edit.component';
import {Blog} from '../../../models/blog';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { user } from '../../../models/user';
import { RestapiService } from '../../../services/restapi.service';
import { FormsModule } from '@angular/forms';
import { TranslationService } from '../../../services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
 
})
export class HomeComponent implements OnInit {
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<EditComponent, any> | undefined;
  title: string = '';
  country: string = '';
  description: string = '';
  base64Image: string = '';
  image: File | null = null;
  translatedBlogs: { [key: number]: { title: string, description: string } } = {};
  public id: number = 1;
  u: user = {} as user;
  firstname: string = '';
  imagePath: string = '';
  latitude: number = 0;
  longitude: number = 0;
  blogs: Blog[] = [];
  currentDate = new Date();
  formattedDate = this.currentDate.toISOString().split('T')[0];

  constructor(
    private router: Router,
    public matDialog: MatDialog,
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

  ngOnInit() {
    this.id = Number(sessionStorage.getItem('uId'));
    console.log(this.id);
    this.getProfile();
    this.getBlogsByUserId();
  }

  openModal() {
    this.dialogConfig.id = "edit-component";
    this.dialogConfig.height = "600px";
    this.dialogConfig.width = "600px";
    this.modalDialog = this.matDialog.open(EditComponent, this.dialogConfig);
  }

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  navigateToBlogs() {
    this.router.navigate(['/blogs']);
  }


  navigateToRecommender() {
    this.router.navigate(['/recommender']);
  }
  showBlogDetail(blog: Blog): void {
    console.log('blog:', blog);
    if (blog?.blogId) {
      this.router.navigate(['/content', blog.blogId]);
    } else {
      console.error('blog.blogId is undefined or null');
    }
  }

  getProfile() {
    this.service.getProfile(this.id).subscribe(
      (response: user) => {
        this.u = response;
        console.log(this.u);
        if (this.u.name) {
          const fullNameParts = this.u.name.split(' ');
          this.firstname = fullNameParts[0];
        }
        this.imagePath = this.u.gender == "0" ? "/assets/images/fille.jpg" : "/assets/images/gar.png";
        this.u.imagePath = this.imagePath;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        alert('Erreur ');
      }
    );
  }

  getFirstName(fullName: string): string {
    const firstName = fullName.split(' ')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1);
  }

  onImageSelected(event: any) {
    this.image = event.target.files[0];
  }

  addBlog(): void {
    if (!this.image) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('country', this.country);
    formData.append('date', this.formattedDate);
    formData.append('imageFile', this.image);
    formData.append('likes', '0'); // Initialize likes count
    (formData as any).append('latitude', this.latitude); 
    (formData as any).append('longitude', this.longitude); 

    this.service.addBlog(formData, this.id).subscribe(
      (response: any) => {
        console.log('Réponse du serveur:', response);
        alert('Opération réussie');
        window.location.reload();
      },
      (error: any) => {
        console.error('Erreur lors de l\'envoi des données:', error);
        alert('Erreur lors de l\'envoi des données');
      }
    );
  }

  translateBlogs(): void {
    const userLanguage = this.translate.currentLang;
    console.log('Current user language:', userLanguage);

    this.blogs.forEach(blog => {
      const blogId = blog.blogId;
      console.log('Processing blog ID:', blogId);

      if (blogId !== undefined) {
        this.translationService.translate(blog.title, userLanguage).subscribe(
          (translatedTitle: string) => {
            console.log(`Translated title for blog ID ${blogId}:`, translatedTitle);
            this.translationService.translate(blog.description, userLanguage).subscribe(
              (translatedDescription: string) => {
                console.log(`Translated description for blog ID ${blogId}:`, translatedDescription);
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

  getBlogsByUserId(): void {
    this.service.getBlogsByUserId(this.id).subscribe(
      (data) => {
        this.blogs = data;
        this.translateBlogs();
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  toggleLike(blog: Blog, event: Event): void {
    event.stopPropagation(); // Prevent event propagation to parent elements
    if (blog.blogId !== undefined) {
      if (!blog.liked) {
        this.service.likeBlog(blog.blogId).subscribe(
          (updatedBlog: Blog) => {
            blog.likes = updatedBlog.likes;
            blog.liked = true;
          },
          (error) => {
            console.error('Error liking blog:', error);
          }
        );
      } else {
        this.service.unlikeBlog(blog.blogId).subscribe(
          (updatedBlog: Blog) => {
            blog.likes = updatedBlog.likes;
            blog.liked = false;
          },
          (error) => {
            console.error('Error unliking blog:', error);
          }
        );
      }
    }
  }
}