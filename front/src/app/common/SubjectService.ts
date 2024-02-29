import { RegisterRequest } from '../model/RegisterRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

import { environment } from 'src/environments/environment';
import { Article } from '../model/Articles';
import { Subjects } from '../model/Subjects';


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
  public getSubject( ): Observable<Subjects> { 
    return this.http.get<Subjects>(this.urlApi ,this.httpOptions);
  }


  public addSubject(id:Number) : Observable<Subjects> {
    return this.http.post<Subjects>(this.urlApi + "favoris/" + id, this.httpOptions);
  }

  public getFavoris() : Observable<Subjects> {
    return this.http.get<Subjects>(this.urlApi + "favoris", this.httpOptions);
  }

  public deleteSubject(id:Number) : Observable<Subjects> {
    return this.http.delete<Subjects>(this.urlApi + "favoris/" + id, this.httpOptions);
  }


}
