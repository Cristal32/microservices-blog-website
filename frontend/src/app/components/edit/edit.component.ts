import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { user } from '../../../models/user';
import { RestapiService } from '../../../services/restapi.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,FormsModule,TranslateModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<EditComponent>,private service :RestapiService,private translate: TranslateService) {

    this.translate.setDefaultLang('en');
    
    // Use browser language if available and falls back to 'en' if not matched
    const browserLang = this.translate.getBrowserLang();
    if (browserLang && browserLang.match(/en|fr/)) {
      this.translate.use(browserLang);
    } else {
      this.translate.use('en');
    }
   }
 
  
  closeModal() {
    this.dialogRef.close();
  }
   closeModalAndReload(): void {
    // Fermez votre modalité ici, puis rafraîchissez la page
    this.closeModal();
    window.location.reload();
  }
   //getprofile
   u :user = { } as user
   u1 :user = { } as user
   public  id:number=1
   firstname:string=''
   imagePath:string=''
  
   ngOnInit() {
     
    this.id = Number(sessionStorage.getItem('uId'));
    console.log(this.id)
  
    this.getProfile()
  }
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
        // Sélectionner le bouton radio en fonction du genre
        if (this.u.gender === "0") {
          const dot1 = document.getElementById('dot-2');
          if (dot1) {
            dot1.setAttribute('checked', 'true');
          }
        } else {
          const dot2 = document.getElementById('dot-1');
          if (dot2) {
            dot2.setAttribute('checked', 'true');
          }
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        alert('Erreur ')
      }
    );
  }
  editProfile() {
    this.u.userId=this.id;
    // Appel à la méthode de modification du profil avec l'utilisateur modifié

   this.service.editProfile(this.u,this.id).subscribe(
      () => {
 
        console.log(this.u);
        // Faire autre chose après la mise à jour du profil
        alert('Profil mis à jour avec succès');
      },
      error => {
        console.error('Erreur lors de la mise à jour du profil :', error);
        // Gérer l'erreur de mise à jour du profil
        alert('Erreur lors de la mise à jour du profil');
               console.log('after sending')
        console.log(this.u);
      }
    );
  }
  
  
}

