import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { NavbarComponent } from './components/navbar/navbar.component';

// service
import {RegisterService} from './register.service';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserLogoutComponent } from './components/user-logout/user-logout.component';
import { CreateBlogComponent } from './components/create-blog/create-blog.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    NavbarComponent,
    UserLoginComponent,
    UserLogoutComponent,
    CreateBlogComponent,
    BlogListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
