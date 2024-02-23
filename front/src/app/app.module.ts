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

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    ArticlesComponent,
    ThemesComponent,

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
    MatCardModule


  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: LogInterceptor,
    multi: true,
    

    
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
