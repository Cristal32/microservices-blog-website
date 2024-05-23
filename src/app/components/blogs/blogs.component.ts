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
    'France', 'Afghanistan', 'Afrique_Centrale', 'Afrique_du_sud', 'Albanie', 'Algerie', 'Allemagne', 'Andorre', 'Angola', 'Anguilla', 
    'Arabie_Saoudite', 'Argentine', 'Armenie', 'Australie', 'Autriche', 'Azerbaidjan', 'Bahamas', 'Bangladesh', 'Barbade', 'Bahrein', 
    'Belgique', 'Belize', 'Benin', 'Bermudes', 'Bielorussie', 'Bolivie', 'Botswana', 'Bhoutan', 'Boznie_Herzegovine', 'Bresil', 'Brunei', 
    'Bulgarie', 'Burkina_Faso', 'Burundi', 'Caiman', 'Cambodge', 'Cameroun', 'Canada', 'Canaries', 'Cap_vert', 'Chili', 'Chine', 'Chypre', 
    'Colombie', 'Comores', 'Congo', 'Congo_democratique', 'Cook', 'Coree_du_Nord', 'Coree_du_Sud', 'Costa_Rica', 'Cote_d_Ivoire', 'Croatie', 
    'Cuba', 'Danemark', 'Djibouti', 'Dominique', 'Egypte', 'Emirats_Arabes_Unis', 'Equateur', 'Erythree', 'Espagne', 'Estonie', 'Etats_Unis', 
    'Ethiopie', 'Falkland', 'Feroe', 'Fidji', 'Finlande', 'France', 'Gabon', 'Gambie', 'Georgie', 'Ghana', 'Gibraltar', 'Grece', 'Grenade', 
    'Groenland', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernesey', 'Guinee', 'Guinee_Bissau', 'Guinee_Equatoriale', 'Guyana', 'Guyane_Francaise', 
    'Haiti', 'Hawaii', 'Honduras', 'Hong_Kong', 'Hongrie', 'Inde', 'Indonesie', 'Iran', 'Iraq', 'Irlande', 'Islande',  'Italie', 
    'Jamaique', 'Jan_Mayen', 'Japon', 'Jersey', 'Jordanie', 'Kazakhstan', 'Kenya', 'Kirghizistan', 'Kiribati', 'Koweit', 'Laos', 'Lesotho', 
    'Lettonie', 'Liban', 'Liberia', 'Liechtenstein', 'Lituanie', 'Luxembourg', 'Lybie', 'Macao', 'Macedoine', 'Madagascar', 'Madere', 'Malaisie', 
    'Malawi', 'Maldives', 'Mali', 'Malte', 'Man', 'Mariannes_du_Nord', 'Maroc', 'Marshall', 'Martinique', 'Maurice', 'Mauritanie', 'Mayotte', 
    'Mexique', 'Micronesie', 'Midway', 'Moldavie', 'Monaco', 'Mongolie', 'Montserrat', 'Mozambique', 'Namibie', 'Nauru', 'Nepal', 'Nicaragua', 
    'Niger', 'Nigeria', 'Niue', 'Norfolk', 'Norvege', 'Nouvelle_Caledonie', 'Nouvelle_Zelande', 'Oman', 'Ouganda', 'Ouzbekistan', 'Pakistan', 
    'Palau', 'Palestine', 'Panama', 'Papouasie_Nouvelle_Guinee', 'Paraguay', 'Pays_Bas', 'Perou', 'Philippines', 'Pologne', 'Polynesie', 
    'Porto_Rico', 'Portugal', 'Qatar', 'Republique_Dominicaine', 'Republique_Tcheque', 'Reunion', 'Roumanie', 'Royaume_Uni', 'Russie', 'Rwanda', 
    'Sahara_Occidental', 'Sainte_Lucie', 'Saint_Marin', 'Salomon', 'Salvador', 'Samoa_Occidentales', 'Samoa_Americaine', 'Sao_Tome_et_Principe', 
    'Senegal', 'Seychelles', 'Sierra_Leone', 'Singapour', 'Slovaquie', 'Slovenie', 'Somalie', 'Soudan', 'Sri_Lanka', 'Suede', 'Suisse', 'Surinam', 
    'Swaziland', 'Syrie', 'Tadjikistan', 'Taiwan', 'Tonga', 'Tanzanie', 'Tchad', 'Thailande', 'Tibet', 'Timor_Oriental', 'Togo', 'Trinite_et_Tobago', 
    'Tristan_da_Cunha', 'Tunisie', 'Turkmenistan', 'Turquie', 'Ukraine', 'Uruguay', 'Vanuatu', 'Vatican', 'Venezuela', 'Vierges_Americaines', 
    'Vierges_Britanniques', 'Vietnam', 'Wake', 'Wallis_et_Futuma', 'Yemen', 'Yougoslavie', 'Zambie', 'Zimbabwe'
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
