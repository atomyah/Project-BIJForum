import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { faqComment, User } from '../../class/baseClass';
import { Store } from '@ngrx/store'; 
import * as fromCore from '../../core/store/reducers';
//import * as fromFaqforum from './store/faqforum.reducer';
//import { AddFaqforum, DeleteFaqforum, LoadFaqforums, UpdateFaqforum } from './store/faqforum.actions';
// 機能ストア（エンティティを用いたストア実装）の使用はどうしても解決できないエラーのためペンディング
// ERROR TypeError: Cannot assign to read only property 'user' of object '[object Object]'


@Component({
  selector: 'app-faqforum',
  templateUrl: './faqforum.component.html',
  styleUrls: ['../../common.scss', './faqforum.component.scss']
})
export class FaqforumComponent implements OnInit {

  public content = '';
  public faqcomments: Observable<faqComment[]>;
  public current_user: User;

  constructor(private db: AngularFirestore,
              private store: Store<fromCore.State>) { 
                this.store.select(fromCore.getSession)
                .subscribe(data => {
                  this.current_user = data.user;
                });
  }

  ngOnInit() {
    this.faqcomments = this.db
      .collection<faqComment>('faqcomments', ref => {
        return ref.orderBy('created_at', 'asc');
      })
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(action => {
          // 日付をセットしたコメントを返す
          const data = action.payload.doc.data() as faqComment;
          const key = action.payload.doc.id;
          const faqcomment_data = new faqComment(data.user, data.content);
          faqcomment_data.setData(data.created_at, key);
          console.log('faqcomment_dataは、' + faqcomment_data)
          return faqcomment_data;
        })));
  }

  // 新しいコメントを追加
  addComment(e: Event, faqcomment: string) {
    e.preventDefault();
    if (faqcomment) {
      this.db
        .collection('faqcomments')
        .add(new faqComment(this.current_user, faqcomment).deserialize());
      this.content = '';
    }
  }  

  // 編集フィールドの切り替え
  toggleEditComment(faqcomment: faqComment) {
    faqcomment.edit_flag = (!faqcomment.edit_flag);
  }

  // コメントを更新する
  saveEditComment(faqcomment: faqComment) {
    this.db
    .collection('faqcomments')
    .doc(faqcomment.id)
    .update({
      content: faqcomment.content,
      created_at: faqcomment.created_at
    })
    .then(() => {
      alert('コメントを更新しました');
      faqcomment.edit_flag = false;
    });
  }

  // コメントをリセットする
  resetEditComment(faqcomment: faqComment) {
    faqcomment.content = '';
  }

  // コメントを削除する
  deleteComment(id: string) {
    this.db
      .collection('faqcomments')
      .doc(id)
      .delete()
      .then(() => {
        alert('コメントを削除しました');
      });
  }

}
