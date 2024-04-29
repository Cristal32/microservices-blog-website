import { Component } from '@angular/core';
import { RestapiService } from '../../services/restapi.service';
import { user } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
 imports: [CommonModule,FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
constructor(private service:RestapiService ,private router: Router){}
added: user ={ } as user
u: user ={ } as user
 public uId :number=0

getUser(){
  this.service.authentifier(this.u.email,this.u.password).subscribe(
    (response: user) => {
      this.u = response;
      console.log(this.u);
      sessionStorage.setItem('uId', this.u.userId.toString());
      this.router.navigate(['/home']);
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
      alert('Erreur ')
    }
  );
}
addUser(): void {
  this.service.addUser(this.added).subscribe(
    response => {
      console.log(response); // Affichez la réponse HTTP complète
      // Faites autre chose avec la réponse, comme accéder au corps de la réponse, aux en-têtes, etc.
      alert('Profil mis à jour avec succès');
      sessionStorage.setItem('uId', response.userId.toString());
      this.router.navigate(['/home']);
    },
    error => {
      console.error('Erreur lors de la mise à jour du profil :', error);
      alert('Erreur lors de l\'insertion');
      console.log('after sending');
    }
  );
}


}



