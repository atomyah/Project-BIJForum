import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from '../../core/guard/auth.guard';
import { LoginGuard } from '../../core/guard/login.guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {path: "login", component: LoginComponent,canActivate: [LoginGuard]},
  {path: "signup", component: SignUpComponent,canActivate: [LoginGuard]},
  {path: "editprofile", component: EditProfileComponent},//canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
