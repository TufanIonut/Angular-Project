import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if(localStorage.getItem('username') && localStorage.getItem('token') || sessionStorage.getItem('username') && sessionStorage.getItem('token')){
      this.router.navigate(['dashboard'])
      false;
    }else{
      return true;
    }
    return false;
  }

  
}
