import { RegisterRequest } from '../model/RegisterRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

import { environment } from 'src/environments/environment';
import { Article } from '../model/Articles';
import { ArticleRequest } from '../model/ArticleRequest';


@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  public user!: User;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //LES DIFFERENTS URL DU BACK
  public urlApi: string = environment.apiUrl + 'article';


  //METHODE POUR RECUPERER LES ARTICLES
  public getArticle(): Observable<Article> { 
    return this.http.get<Article>(this.urlApi ,this.httpOptions);
  }

  //METHODE POUR RECUPERER UN ARTICLE PAR SON ID
  public getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(this.urlApi + '/' + id, this.httpOptions);
  }


  public createArticle(articleRequest : ArticleRequest) : Observable<Article> {
    return this.http.post<Article>(this.urlApi, articleRequest, this.httpOptions);
  }

  //METHODE POUR RECUPERER LES ARTICLES PAR THEME
  public getArticleByTheme(id: number): Observable<Article> {
    return this.http.get<Article>(this.urlApi + '/subject/' + id, this.httpOptions);
  }


}
