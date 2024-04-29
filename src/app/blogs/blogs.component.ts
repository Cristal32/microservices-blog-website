import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogResponse } from '../../models/blogResponse';
import { RestapiService } from '../../services/restapi.service';
import { ContentComponent } from '../content/content.component';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  constructor(private router: Router, private service: RestapiService) { }
  id: number = 0;
  selectedBlog: BlogResponse | null = null; // Declare selectedBlog property
  

  ngOnInit() {
    this.id = Number(sessionStorage.getItem('uId'));
    console.log(this.id);
    this.getAllBlogs();

    
  }

  scrollTo(element: any): void {
    (document.getElementById(element) as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }

  

  showBlogDetail(blogResponse: BlogResponse): void {
    console.log('blogResponse:', blogResponse); // Add this line
    if (blogResponse?.blog?.blogId) {
      this.router.navigate(['/content', blogResponse.blog.blogId]);
    } else {
      console.error('blogResponse.blog.blogid is undefined or null');
    }
  }

  countries: string[] = [
    'France','Afghanistan', 'Albanie', 'Algerie', 'Allemagne', 'Andorre', 'Angola', 'Anguilla', 'Antarctique', 'Antigua_et_Barbuda', 
    'Arabie_Saoudite', 'Argentine', 'Armenie', 'Aruba', 'Australie', 'Autriche', 'Azerbaidjan', 'Bahamas', 'Bahrein', 
    'Bangladesh', 'Barbade', 'Belgique', 'Belize', 'Benin', 'Bermudes', 'Bhoutan', 'Biélorussie', 'Bolivie', 
    'Bosnie_Herzegovine', 'Botswana', 'Bresil', 'Brunei', 'Bulgarie', 'Burkina_Faso', 'Burundi', 'Cambodge', 'Cameroun', 
    'Canada', 'Cap_Vert', 'Chili', 'Chine', 'Chypre', 'Colombie', 'Comores', 'Congo', 'Coree_du_Nord', 'Coree_du_Sud', 
    'Costa_Rica', 'Croatie', 'Cuba', 'Danemark', 'Djibouti', 'Dominique', 'Egypte', 'Emirats_Arabes_Unis', 'Equateur', 
    'Erythree', 'Espagne', 'Estonie', 'Etats_Unis', 'Ethiopie', 'Fidji', 'Finlande', 'France', 'Gabon', 'Gambie', 'Georgie', 
    'Ghana', 'Gibraltar', 'Grece', 'Grenade', 'Groenland', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernesey', 'Guinee', 
    'Guinee_Bissau', 'Guinee_Equatoriale', 'Guyana', 'Guyane_Francaise', 'Haiti', 'Hawaii', 'Honduras', 'Hong_Kong', 
    'Hongrie', 'Inde', 'Indonesie', 'Iran', 'Iraq', 'Irlande', 'Islande', 'Israel', 'Italie', 'Jamaique', 'Jan_Mayen', 
    'Japon', 'Jersey', 'Jordanie', 'Kazakhstan', 'Kenya', 'Kirghizstan', 'Kiribati', 'Koweit', 'Laos', 'Lesotho', 'Lettonie', 
    'Liban', 'Liberia', 'Liechtenstein', 'Lituanie', 'Luxembourg', 'Lybie', 'Macao', 'Macedoine', 'Madagascar', 'Madère', 
    'Malaisie', 'Malawi', 'Maldives', 'Mali', 'Malte', 'Man', 'Mariannes du Nord', 'Maroc', 'Marshall', 'Martinique', 
    'Maurice', 'Mauritanie', 'Mayotte', 'Mexique', 'Micronesie', 'Midway', 'Moldavie', 'Monaco', 'Mongolie', 'Montserrat', 
    'Mozambique', 'Namibie', 'Nauru', 'Nepal', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk', 'Norvege', 
    'Nouvelle_Caledonie', 'Nouvelle_Zelande', 'Oman', 'Ouganda', 'Ouzbekistan', 'Pakistan', 'Palau', 'Palestine', 'Panama', 
    'Papouasie_Nouvelle_Guinee', 'Paraguay', 'Pays_Bas', 'Perou', 'Philippines', 'Pologne', 'Polynesie', 'Porto_Rico', 
    'Portugal', 'Qatar', 'Republique_Dominicaine', 'Republique_Tcheque', 'Reunion', 'Roumanie', 'Royaume_Uni', 'Russie', 
    'Rwanda', 'Sahara_Occidental', 'Sainte_Lucie', 'Saint_Marin', 'Salomon', 'Salvador', 'Samoa_Occidentales', 
    'Samoa_Americaine', 'Sao_Tome_et_Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Singapour', 'Slovaquie', 
    'Slovenie', 'Somalie', 'Soudan', 'Sri_Lanka', 'Suede', 'Suisse', 'Surinam', 'Swaziland', 'Syrie', 'Tadjikistan', 
    'Taiwan', 'Tonga', 'Tanzanie', 'Tchad', 'Thailande', 'Tibet', 'Timor_Oriental', 'Togo', 'Trinite_et_Tobago', 
    'Tristan da cunha', 'Tunisie', 'Turkmenistan', 'Turquie', 'Ukraine', 'Uruguay', 'Vanuatu', 'Vatican', 'Venezuela', 
    'Vierges_Americaines', 'Vierges_Britanniques', 'Vietnam', 'Wake', 'Wallis et Futuna', 'Yemen', 'Yougoslavie', 
    'Zambie', 'Zimbabwe'
  ];
  

  selectedCountry: string = '';
  blogs: BlogResponse[] = [];

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.getBlogsByCountry(this.selectedCountry);
    }
  }

  getBlogsByCountry(country: string): void {
    this.service.getBlogsByCountry(country)
      .subscribe(blogs => {
        console.log('blogs:', blogs); // Add this line
        this.blogs = blogs.map(blog => ({
          ...blog,
          imagePath: blog.gender === '0' ? '/assets/images/fille.jpg' : '/assets/images/gar.png'
        }));
      },
      (error) => {
        console.error('Error fetching blogs:', error);
        // Handle error if needed
      }
    );
  }

  getAllBlogs(): void {
    this.service.getAllBlogs()
    .subscribe(blogs => {
      console.log('blogs:', blogs); // Add this line
      this.blogs = blogs.map(blog => ({
        ...blog,
        imagePath: blog.gender === '0' ? '/assets/images/fille.jpg' : '/assets/images/gar.png'
      }));
    },
    (error) => {
      console.error('Error fetching blogs:', error);
      // Handle error if needed
    }
  );
  }
}
