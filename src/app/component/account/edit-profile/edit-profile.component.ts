import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../../../class/baseClass';
import { Store } from '@ngrx/store'; 
import * as fromCore from '../../../core/store/reducers';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['../../../common.scss','./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  //  userRef: AngularFirestoreCollection<User>; // Firestoreのusersコレクションへの参照オブジェクト
  public current_user: User;


  constructor(private db: AngularFirestore, private store: Store<fromCore.State>) {
    this.store.select(fromCore.getSession)
    .subscribe(data => {
      this.current_user = data.user;
    })
    console.log('現在ログイン中ユーザのuidは、' + this.current_user.uid);
   }


  ngOnInit() {
    /*
    this.current_user_prof = this.db
    .collection<User>('users', ref => ref.where('uid', '==', this.uid))
    .snapshotChanges().pipe
      (map(actions => {
        return actions.map(action => {
        const data = action.payload.doc.data() as User;
        const id = action.payload.doc.id;
        const user_data = new User(data.uid);
        return { id, ...user_data};
      });
    }));
    */
  }

}
