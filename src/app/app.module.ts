import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


import { HttpClient } from '@angular/common/http'; // Ensure HttpClient is imported
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BlogsComponent } from './blogs/blogs.component';
import { ContentComponent } from './content/content.component';

import { HttpClientModule } from '@angular/common/http';
import { RestapiService } from '../services/restapi.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from "@angular/google-maps";

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TestComponent } from './test/test.component';

import { TranslationService } from '../services/translation.service';
import { TravelRecommenderComponent } from './travel-recommender/travel-recommender.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './map/map.component';
// Function to create TranslateLoader
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    ContentComponent,
    TestComponent,
    TravelRecommenderComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    GoogleMapsModule
  ],
  providers: [
  RestapiService,
  TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
