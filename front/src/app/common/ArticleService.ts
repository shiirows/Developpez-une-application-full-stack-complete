import { RegisterRequest } from '../model/RegisterRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

import { environment } from 'src/environments/environment';
import { Article } from '../model/Articles';


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
  public urlApi: string = environment.apiUrl + 'article/';


  //METHODE POUR RECUPERER LES ARTICLES
  public getArticle(): Observable<Article> { 
    return this.http.get<Article>(this.urlApi ,this.httpOptions);
  }


  public createArticle()  {
  }


}
