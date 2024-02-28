import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../common/TokenService';

@Injectable({
  providedIn: 'root'
})
export class noAuthGuard implements CanActivate {
  
  constructor
  (private tokenService: TokenService) { } 


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.tokenService.getUser().token;
    if (!token) {
      return true;
    }
    return false;
  }


  
}