import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

import { faqComment } from '../../../class/baseClass';
import {
  AddFaqforum,
  FaqforumActionTypes,
  DeleteFaqforum,
  LoadFaqforums,
  LoadFaqforumsFail,
  LoadFaqforumsSuccess,
  UpdateFaqforum,
  WriteFaqforumFail,
  WriteFaqforumSuccess,
} from './faqforum.actions';


@Injectable()
export class FaqforumEffects {

  constructor(private actions$: Actions, private db: AngularFirestore) {}

  @Effect()
  addFaqforum$: Observable<Action> =
    this.actions$.pipe(
      ofType<AddFaqforum>(FaqforumActionTypes.AddFaqforum),
      map(action => action.payload.faqforum),
      switchMap((faqcomment: faqComment) => {
        return this.db
          .collection('faqcomments')
          .add(faqcomment.deserialize())
          .then(() => new WriteFaqforumSuccess(null))
          .catch(() => new WriteFaqforumFail({ error: 'failed to add' }));
      })
    );

  @Effect()
  updateFaqforum$: Observable<Action> =
    this.actions$.pipe(
      ofType<UpdateFaqforum>(FaqforumActionTypes.UpdateFaqforum),
      map(action => action.payload.faqforum),
      switchMap((faqcomment: Update<faqComment>) => {
        return this.db
          .collection('faqcomments')
          .doc(faqcomment.id.toString())
          .update({ content: faqcomment.changes.content, created_at: faqcomment.changes.created_at })
          .then(() => {
            alert('コメントを更新しました');
            return new WriteFaqforumSuccess(null);
          })
          .catch(() => new WriteFaqforumFail({ error: 'failed to update' }));
      })
    );

    @Effect()
  deleteFaqforum$: Observable<Action> =
    this.actions$.pipe(
      ofType<DeleteFaqforum>(FaqforumActionTypes.DeleteFaqforum),
      map(action => action.payload.id),
      switchMap((id: string) => {
        return this.db
          .collection('faqcomments')
          .doc(id)
          .delete()
          .then(() => {
            alert('コメントを削除しました');
            return new WriteFaqforumSuccess(null);
          })
          .catch(() => new WriteFaqforumFail({ error: 'failed to delete' }));
      })
    );

    @Effect()
  loadFaqforums$: Observable<Action> =
      this.actions$.pipe(
        ofType<LoadFaqforums>(FaqforumActionTypes.LoadFaqforums),
        map(action => action.payload.faqforums),
        switchMap(() => {
          return this.db.collection<faqComment>('faqcomments', ref => {
            return ref.orderBy('created_at', 'asc');
          }).snapshotChanges()
            .pipe(
              map(actions => actions.map(action => {
                // 日付をセットしたコメントを返す
                const data = action.payload.doc.data() as faqComment;
                const key = action.payload.doc.id;
                const faqcomments_data = new faqComment(data.user, data.content);
                faqcomments_data.setData(data.created_at, key);
                console.log('faqcomments_data.contentは、' + faqcomments_data.content);
                console.log('faqcomments_data.userは、' + faqcomments_data.user);
                return faqcomments_data;
              })),
              map((result: faqComment[]) => {
                return new LoadFaqforumsSuccess({
                  faqforums: result
                });
              }),
              catchError(this.handleFaqforumsError(
                'fetchFaqforums', new LoadFaqforumsFail()
              ))
            );
        })
      );
      
  // エラー発生時の処理
  private handleFaqforumsError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {

      // 失敗した操作の名前、エラーログをconsoleに出力
      console.error(`${operation} failed: ${error.message}`);

      // 結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }
  
}
