import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {　Router } from '@angular/router';
import { SessionService } from '../service/session.service'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private session: SessionService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.session
      .checkLoginState()
      .pipe(
        map(session => {
          // ログインしていない場合はログイン画面に遷移
          if(!session.login) {
            this.router.navigate(['/login']);
          }
          return session.login         
        })
      )
  }
  
}
