import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private authService: AuthService, private routing: Router) {}

  unauhorizedRedirect(): boolean {
    this.routing.navigate(['/']);
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return (this.authService.isAuthenticated()) ? true : this.unauhorizedRedirect();
  }
}
