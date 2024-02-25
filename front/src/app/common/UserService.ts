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
export class UserService {
  public user!: User;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  //LES DIFFERENTS URL DU BACK
  public urlApi: string = environment.apiUrl + 'auth/';
  public urlApiUser : string = environment.apiUrl + 'user';

  public getUser() : Observable<User> {
    return this.http.get<User>(this.urlApi + "me" , this.httpOptions);
  }

  public updateUser(user: User) : Observable<User> {
    return this.http.put<User>(this.urlApiUser, user, this.httpOptions);
  }


}
