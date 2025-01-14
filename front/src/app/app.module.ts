import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { LogInterceptor } from './LogInterceptor';
import { RegistrationComponent } from './pages/registration/registration.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './pages/navbar/navbar.component'; 
import { MatMenuModule } from '@angular/material/menu';
import { ArticlesComponent } from './pages/articles/articles.component';
import {MatCardModule} from '@angular/material/card';
import { ThemesComponent } from './pages/themes/themes.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SubjectComponent } from './component/subject/subject.component';
import { ArticleComponent } from './component/article/article.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticleSubjectComponent } from './pages/article-subject/article-subject.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    ArticlesComponent,
    ThemesComponent,
    CreateArticleComponent,
    ProfileComponent,
    SubjectComponent,
    ArticleComponent,
    ArticleDetailComponent,
    ArticleSubjectComponent,

  ],

  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatButtonModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,



  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: LogInterceptor,
    multi: true,
    

    
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
