import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { SharedModule } from './../common/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
  ],
  imports: [
    AuthRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
  ],
})
export class AuthModule { }
