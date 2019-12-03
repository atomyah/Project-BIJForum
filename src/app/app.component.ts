import { Component } from '@angular/core';
import { SessionService } from './core/service/session.service';

@Component({
  selector: 'app-root',
  template: `
  <app-header></app-header>
  <!--コンテンツ挿入場所。上ヘッダー部分50pxあける-->
  <div style="position:absolute;top:50px;left:0px; width: 100%;">
  <router-outlet></router-outlet>
  </div>

  `,
  //styleUrls: ['./common.scss', './app.component.scss']
})
export class AppComponent {
  title = 'ベンゾフォーラム';
  constructor(private session: SessionService) {
    this.session. checkLogin();
  }
}
