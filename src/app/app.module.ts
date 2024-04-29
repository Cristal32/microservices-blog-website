import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BlogsComponent } from './blogs/blogs.component';
import { ContentComponent } from './content/content.component';

import { HttpClientModule } from '@angular/common/http';
import { RestapiService } from '../services/restapi.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    ContentComponent,
   

 

  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
  ],
  providers: [
  RestapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
