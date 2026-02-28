import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {AuthState} from "./auth/reducers";
import {GlobalAppState} from "./reducers";
import {isLoggedIn, isLoggedOut} from "./auth/auth.selectors";
import {logoutAction} from "./auth/auth.actions";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;

    // use reactive observable instead of plain boolean
    isLoggedIn$: Observable<boolean>
    isLoggedOut$: Observable<boolean>

    constructor(private router: Router, private store: Store<GlobalAppState>) {
      // challenge yourself - try out on your own first!, show/hide login logout buttons based on store data
    }

    ngOnInit() {

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      this.store.subscribe(state => console.log("Store value: ", state))

      this.isLoggedIn$ = this.store.pipe(
        // READ Store Data Option 1
        //  select(state => !!state["auth"].user)

        // READ Store Data Option 2
        // Optimize the below way of reading store data by removing duplicate calculations by replacing plain mapping function with MemoizedSelector function
        select(isLoggedIn) // true if exists

        // actions to perform CRUD operations on a course --> with each action that is dispatched --> new value emitted by the store<GlobalAppState> observable --> with each new value emitted by the observable --> value for isLoggedIn$ true is recalculated EVERY time a new action is dispatched and then store emits new GlobalAppState value e.g. 10 times
        // e.g. distinctUntilChanged()

        // need duplicate elimination functionality to avoid having isLoggedIn value emitted over ane over to the view, only want isLoggedIn$ to emit values if auth state has changed since last time
        // does BOTH mapping of values & elimination of duplicates = select operator in ngrx, not part of rxjs operators
        // mapFn in select operator is a pure map function: takes input and maps it to an output

        // optimization: only perform mapping when input changes, otherwise don't repeat recalculation of the derived value of isLoggedIn$, instead take previously calculated from in-memory cache
        // concept of mapping function with memory = selector
      )

      this.isLoggedOut$ = this.store.pipe(
        map(isLoggedOut) // false if exists
      )

    }

    // Dispatch the Logout Action Type
  // Action => Side Effect => Service/API call => if success then Dispatch New Action to update state, if error then Dispatch New action to display error message => Reducer => Store
  // Actions trigger the reducers to change the values in the state
    logout() {
      this.store.dispatch(logoutAction()) // dispatching action by itself will not modify the data inside the store --> need to create reducer on(that action type)

    }

}
