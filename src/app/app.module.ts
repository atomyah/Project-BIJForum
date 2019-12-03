//Angularモジュールのインポート
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';  // npm install firebase @angular/fireで追加
import { AngularFirestoreModule } from '@angular/fire/firestore'; // npm install firebase @angular/fireで追加
import { AngularFireAuthModule } from '@angular/fire/auth'; // npm install firebase @angular/fireで追加
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //npm i --save bootstrap, npm i --save @ng-bootstrap/ng-bootstrap
import { RouterModule, Routes } from '@angular/router';


//Material2モジュールのインポート
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';


// 作成したコンポーネント・モジュールのインポート
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/guard/auth.guard';
import { LoginGuard } from './core/guard/login.guard';


const appRoutes: Routes = [
  {
    path: 'account',
    loadChildren: './component/account/account.module#AccountModule',
    canActivate: [LoginGuard],
  },
  {
    path: 'faqforum',
    loadChildren: './component/faqforum/faqforum.module#FaqforumModule',
    //canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    FlexLayoutModule, //Flex-layout用モジュール
    NgbModule, //bootstrap5
    CoreModule,
    MatBadgeModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatSelectModule,
    MatTableModule,
    //Firebaseの定義
    AngularFireModule.initializeApp(environment.firebase), // 追加
    AngularFirestoreModule,  // 追加.Firestore用モジュール
    AngularFireAuthModule,    // 追加.angularfireのAuth用モジュール
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
