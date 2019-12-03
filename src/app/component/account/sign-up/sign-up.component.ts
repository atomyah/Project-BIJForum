import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../core/service/session.service';
import { Password } from '../../../class/baseClass';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  public account = new Password();

  constructor(private session: SessionService) { }

  ngOnInit() {
  }

  // アカウント作成
  submitSignUp(e: Event) {
    e.preventDefault();
    // パスワード確認
    if (this.account.password !== this.account.password_confirmation) {
      alert('パスワードが異なります。');
      return;
    }
    this.session.signup(this.account);
    // this.account.reset(); 削除
  }
}
