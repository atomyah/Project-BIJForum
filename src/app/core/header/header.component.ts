import { Component, OnInit } from '@angular/core';
import {　Router } from '@angular/router';
import { Observable } from 'rxjs'; 
import { Store } from '@ngrx/store'; 

import { SessionService } from '../service/session.service'
import { Session } from '../../class/baseClass';
import * as fromCore from '../store/reducers';
import * as fromFaqforum from '../../component/faqforum/store/faqforum.reducer'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../../common.scss', './header.component.scss']
})

export class HeaderComponent implements OnInit {
  public loadingSession$: Observable<boolean>;
  public lodadingFaqforum$: Observable<boolean>;
  public session$: Observable<Session>; 

  constructor(private sessionService: SessionService,
              private store: Store<fromCore.State>,
              private faqforum: Store<fromFaqforum.State>,
              public router: Router) {
    this.loadingSession$ = this.store.select(fromCore.getLoading);
    this.lodadingFaqforum$ = this.faqforum.select(fromFaqforum.getFaqforumLoading);
    this.session$ = this.store.select(fromCore.getSession);
   }

  ngOnInit() {
  }

  logout() { 
    this.sessionService.logout();
  }

}
