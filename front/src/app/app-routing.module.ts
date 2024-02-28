import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { ThemesComponent } from './pages/themes/themes.component';
import { CreateArticleComponent } from './pages/create-article/create-article.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ArticleDetailComponent } from './pages/article-detail/article-detail.component';
import { ArticleSubjectComponent } from './pages/article-subject/article-subject.component';
import { AuthGuard } from './core/auth.guard';
import { noAuthGuard } from './core/noAuth.guard';

// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [{ path: '', component: HomeComponent, canActivate: [noAuthGuard] },
{ path: 'login', component: LoginComponent, canActivate: [noAuthGuard]},
{ path: 'register', component: RegistrationComponent, canActivate: [noAuthGuard]},
{ path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard]},
{ path: 'themes', component: ThemesComponent, canActivate: [AuthGuard]},
{ path: 'create-article', component: CreateArticleComponent, canActivate: [AuthGuard] },
{ path: 'profile', component: ProfileComponent , canActivate: [AuthGuard]},
{ path: 'article-detail/:id', component: ArticleDetailComponent, canActivate: [AuthGuard] },
{ path: 'article-subject/:id', component: ArticleSubjectComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
