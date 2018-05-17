import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRBReducers from '../../store/rb-store.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'rb-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild('signInForm') form: NgForm;
  constructor(private store: Store<fromRBReducers.RBState>) { }

  ngOnInit() {
  }

  login () {
    const email = this.form.value.email;
    const pwd = this.form.value.password;
    this.store.dispatch(new AuthActions.TrySignin({username: email, password: pwd}));
  }

}
