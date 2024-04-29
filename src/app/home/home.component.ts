import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router'; // Import Router
import { EditComponent } from '../edit/edit.component';

import imageCompression from 'browser-image-compression';

import {Blog} from '../../models/blog';

import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { user } from '../../models/user';
import { RestapiService } from '../../services/restapi.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<EditComponent, any> | undefined;
  title: string = '';
  country: string = '';
  description: string = '';
  base64Image: string = ''
  image: File | null = null; // Initialize as n

  constructor(private router: Router, public matDialog: MatDialog ,private service:RestapiService){ } // Inject Router
  public  id:number=1
   
  ngOnInit() {
    this.id = Number(sessionStorage.getItem('uId'));
    console.log(this.id)
    this.getProfile()
    this.getBlogsByUserId()


  }
  
  openModal() {
    this.dialogConfig.id = "edit-component";
    this.dialogConfig.height = "600px";
    this.dialogConfig.width = "600px";
    this.modalDialog = this.matDialog.open(EditComponent, this.dialogConfig);
  }
  
  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  // Method to navigate to blogs component
  navigateToBlogs() {
    this.router.navigate(['/blogs']); 
  }


  showBlogDetail(blog: Blog): void {
    console.log('blog:', blog); // Add this line
    if (blog?.blogId) {
      this.router.navigate(['/content', blog.blogId]);
    } else {
      console.error('blog.blogid is undefined or null');
    }
  }

  //getprofile
  u :user = { } as user

  firstname:string=''
  imagePath:string=''


 getProfile() {
  this.service.getProfile(this.id).subscribe(
    (response: user) => {
      this.u = response;
      console.log(this.u);
      // Diviser le nom complet pour obtenir le prénom
      if (this.u.name) {
        const fullNameParts = this.u.name.split(' ');
        // Le prénom est la première partie du nom complet
        this.firstname = fullNameParts[0];
      
      }
      if(this.u.gender=="0"){
         this.imagePath="/assets/images/fille.jpg";
         this.u.imagePath = "/assets/images/fille.jpg";
      }
      else{
          this.imagePath="/assets/images/gar.png";
          this.u.imagePath = "/assets/images/gar.png";
      }

    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      alert('Erreur ')
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


// Get the current date
 currentDate = new Date();

// Format the date as desired (e.g., YYYY-MM-DD)
 formattedDate = this.currentDate.toISOString().split('T')[0];
 addBlog(): void {
  // Vérifiez si une image a été sélectionnée
  if (!this.image) {
    console.error('No image selected');
    return;
  }

  // Créez un nouvel objet FormData
  const formData = new FormData();

  // Ajoutez les données du blog à FormData
  formData.append('title', this.title);
  formData.append('description', this.description);
  formData.append('country', this.country);
  formData.append('date', this.formattedDate);
  formData.append('imageFile', this.image); 

  // Appelez le service pour ajouter le blog
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

//recuperer les blogs
blogs: Blog[] = [];

getBlogsByUserId(): void {
  this.service.getBlogsByUserId(this.id).subscribe(
    (data) => {
      this.blogs = data;
    },
    (error) => {
      console.log('Error:', error);
    }
  );
  }

}
