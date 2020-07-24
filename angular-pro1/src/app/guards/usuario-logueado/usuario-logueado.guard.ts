import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UsuarioLogueadoGuard implements CanActivate {

  constructor(private authService: AuthService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isLoggedin = this.authService.isLoggedin();
    console.log('canActivate', isLoggedin);
    return isLoggedin;
  }
  
}
