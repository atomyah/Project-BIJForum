import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {　Router } from '@angular/router';
import { SessionService } from '../service/session.service'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private session: SessionService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.session // 変更
      .checkLoginState()
      .pipe(
        map( session => {
          // ログインしている場合は質問フォーラム画面に遷移
          if(session.login) {
            this.router.navigate(['/faqforum']);
          }
          return !session.login;
        })
      )
  }
  
}
