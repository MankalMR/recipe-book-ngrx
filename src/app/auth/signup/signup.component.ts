import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRBReducers from '../../store/rb-store.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'rb-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('signUpForm') form: NgForm;

  constructor(private store: Store<fromRBReducers.RBState>) { }

  ngOnInit() {
  }

  registerUser () {
    const email = this.form.value.email;
    const pwd = this.form.value.password;
    this.store.dispatch(new AuthActions.TryRegister({username: email, password: pwd}));
  }
}
