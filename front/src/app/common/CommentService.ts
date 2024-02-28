import { RegisterRequest } from '../model/RegisterRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

import { environment } from 'src/environments/environment';
import { Article } from '../model/Articles';
import { ArticleRequest } from '../model/ArticleRequest';
import { Comment } from '../model/Comment';
import { CommentRequest } from '../model/CommentRequest';


@Injectable({
  providedIn: 'root',
})
export class CommentService {
  public user!: User;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //LES DIFFERENTS URL DU BACK
  public urlApi: string = environment.apiUrl + 'comment';


  //METHODE POUR RECUPERER LES ARTICLES
  public getAllCommente(id: number ): Observable<Comment> { 
    return this.http.get<Comment>(this.urlApi + "/" + id,this.httpOptions);
  }

  //METHODE POUR AJOUTER UN COMMENTAIRE
  public addComment(comment : String, id: Number): Observable<any> {
    return this.http.post<any>(this.urlApi + "/" + id, { comment }, this.httpOptions);
  }



}
