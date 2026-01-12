import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import {AppGlobalState} from "../reducers";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private authService: AuthService,
      private router:Router,
      private store: Store<AppGlobalState>) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {

    const val = this.form.value;
    const email = val.email;
    const pass = val.password


    this.authService.login(email, pass)
      .pipe(
        tap((user) => {
          console.log("login success for user: ", user);

          // store observable emit values of the global state
          // ONLY way to write data in store is the dispatch method
          // why action vs usual CRUD methods? Action is json send to store, each action has a string type, payload to update the internal state
          // save user profile in global store
          this.store.dispatch({
            type: '[Login Component] Login Action',
            payload: {

            }
          })

          this.router.navigateByUrl("/courses")
        })
      )
      .subscribe(
        noop,
        (err) => {alert("Login failed. Error: " + err)}
    )

  }

}

