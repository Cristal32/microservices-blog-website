import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ContentComponent } from './content/content.component';
import { TravelRecommenderComponent } from './travel-recommender/travel-recommender.component';
import { MapComponent } from './map/map.component';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'content/:blogId', component: ContentComponent },
  { path: 'edit', component: EditComponent },
  {path: 'maps', component: MapComponent},
  { path: 'home', component: HomeComponent },
 { 
    path: 'blogs',
     component: BlogsComponent,
    children: [
      // Add child routes here if needed
    ]
  },
  { 
    path: 'recommender',
     component: TravelRecommenderComponent,
    children: [
      // Add child routes here if needed
    ]
  },
  // Add a route for the '/content' path
  { path: 'content', redirectTo: '/home', pathMatch: 'full' } // or specify a default component to render
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
