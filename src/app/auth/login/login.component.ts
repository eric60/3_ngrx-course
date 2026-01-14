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

          /*
          * what is store?
            * store is an observable that emits values of the global state
            * The ONLY way to write data in store is the dispatch method

          * Why use action instead of usual CRUD methods?
            * have indirection -- not explicitly telling store how to update, just sending event or issuing explicit command but the store decides what to do with the action and how it's going to update the internal state e.g. call api, do several things with that action -- basically know action but not implementation to decouple
            * indirection important so that login component not tightly coupled with other parts of the application -- so login component unaware of separate compoents course-card-list or course-dialog that also dispatch actions
            *

          * What is Action?
            * Action is just plain js object(not json format) send to store, to trigger some modification of store type to create a new version of its internal state
            * each action has a string type & optional payload to update the internal state
            *
          *.
           */
          // this.store.subscribe() can subscribe to store to read data
          // save user profile in global store
          this.store.dispatch({
            type: '[Login Component] Login Action',
            payload: {
              userProfile: user
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

