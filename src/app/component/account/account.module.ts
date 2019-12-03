import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AccountRoutingModule } from './account-routing.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  imports: [
    SharedModule,
    AccountRoutingModule
  ],
  declarations: [
    SignUpComponent,
    LoginComponent,
    EditProfileComponent,
  ],
})
export class AccountModule { }
