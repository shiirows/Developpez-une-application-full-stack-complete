import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [{ path: '', component: HomeComponent },
{ path: 'login', component: LoginComponent },
{ path: 'register', component: RegistrationComponent },
{ path: 'articles', component: ArticlesComponent },
{ path: 'themes', component: ThemesComponent },
{ path: 'create-article', component: CreateArticleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
