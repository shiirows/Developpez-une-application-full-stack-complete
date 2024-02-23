import { RegisterRequest } from '../model/RegisterRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

import { environment } from 'src/environments/environment';
import { Article } from '../model/Articles';
import { Themes } from '../model/Subjects';


@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public user!: User;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //LES DIFFERENTS URL DU BACK
  public urlApi: string = environment.apiUrl + 'subject/';


  //METHODE POUR RECUPERER LES ARTICLES
  public getSubject( ): Observable<Themes> { 
    return this.http.get<Themes>(this.urlApi ,this.httpOptions);
  }


  public addSubject(id:Number) : Observable<Themes> {
    return this.http.post<Themes>(this.urlApi + "favoris/" + id, this.httpOptions);
  }


}
