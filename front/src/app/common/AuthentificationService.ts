import { RegisterRequest } from '../model/RegisterRequest';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  public user!: User;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //LES DIFFERENTS URL DU BACK
  public urlApi: string = environment.apiUrl + 'auth/';


  //METHODE POUR LES INSCRIPTION
  public signup(user: RegisterRequest): Observable<any> { 
    return this.http.post(this.urlApi + 'register',user,this.httpOptions
    );
  }


  //METHODE POUR LES CONNEXION
  public signin(email: string, password: string): Observable<any> {
    return this.http.post(this.urlApi + 'login',{ email, password },this.httpOptions);
  }


}
