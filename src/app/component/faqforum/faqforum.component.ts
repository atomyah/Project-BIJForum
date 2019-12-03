import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { faqComment, User } from '../../class/baseClass';
import { Store } from '@ngrx/store'; 
import * as fromCore from '../../core/store/reducers';
import * as fromFaqforum from './store/faqforum.reducer';
import { AddFaqforum, DeleteFaqforum, LoadFaqforums, UpdateFaqforum } from './store/faqforum.actions';


@Component({
  selector: 'app-faqforum',
  templateUrl: './faqforum.component.html',
  styleUrls: ['../../common.scss', './faqforum.component.scss']
})
export class FaqforumComponent implements OnInit {

  public content = '';
  public faqcomments: Observable<faqComment[]>;
  public current_user: User;

  constructor(private faqforum: Store<fromFaqforum.State>, private store: Store<fromCore.State>) { 
    this.store.select(fromCore.getSession)
    .subscribe(data => {
      this.current_user = data.user;
    })
    this.faqcomments = this.faqforum.select(fromFaqforum.selectAllFaqforums)
    console.log('現在ログイン中ユーザのuidは、' + this.current_user.uid);
  }

  ngOnInit() {
    this.store.dispatch(new LoadFaqforums({ faqforums: [] }));
  }

  // 新しいコメントを追加
  addComment(e: Event, faqcomment: string) {
    e.preventDefault();
    if (faqcomment) {
      this.faqforum.dispatch(new AddFaqforum({faqforum: new faqComment(this.current_user, faqcomment)}));
      this.content = '';
    }
  }  

  // 編集フィールドの切り替え
  toggleEditComment(comment: faqComment) {
    comment.edit_flag = (!comment.edit_flag);
  }

  // コメントを更新する
  saveEditComment(faqcomment: faqComment) {
    faqcomment.edit_flag = false;
    this.faqforum.dispatch(new UpdateFaqforum({faqforum: {id: faqcomment.id, changes: faqcomment}}))
  }

  // コメントをリセットする
  resetEditComment(faqcomment: faqComment) {
    faqcomment.content = '';
  }

  // コメントを削除する
  deleteComment(key: string) {
    this.faqforum.dispatch(new DeleteFaqforum({id: key}));
  }

}
