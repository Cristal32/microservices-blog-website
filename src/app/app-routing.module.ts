import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/edit/edit.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { ContentComponent } from './components/content/content.component';
import { TravelRecommenderComponent } from './travel-recommender/travel-recommender.component';
import { MapComponent } from './components/map/map.component';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'content/:blogId', component: ContentComponent },
  { path: 'edit', component: EditComponent },
  { path: 'maps', component: MapComponent }, // Route without parameters
  { path: 'maps/:lat/:lng', component: MapComponent }, 
  { path: 'home', component: HomeComponent },
 { 
    path: 'blogs',
     component: BlogsComponent,
    
  },
  { 
    path: 'recommender',
     component: TravelRecommenderComponent,
  
  },
  // Add a route for the '/content' path
  { path: 'content', redirectTo: '/home', pathMatch: 'full' } // or specify a default component to render
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
